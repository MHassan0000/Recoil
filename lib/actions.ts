"use server"
import {auth }from "@/auth";
import { parseServerActionResponse } from "./utils";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createStartup = async (state : any , form: FormData, pitch: string) =>{

    const session = await auth();
    if(!session){
        return  parseServerActionResponse({ status: "error", error: "NOT SIGNED IN" });
    }
    const { title , description , category , image} = Object.fromEntries(Array.from(form).filter(([key]) => key!== "pitch"));
    const slug = slugify(title as string , {lower : true , strict : true});

    try {
        const startup  = {
            title,
            description,
            category,
            image,
            slug : {
                _type: 'slug',
                current: slug,
            },
            author : {
                _type: 'reference',
                _ref: session?.user?.id,
            },
            pitch,
        };

            const result = await writeClient.create({
                _type: 'startup',
                ...startup,
            });
            return parseServerActionResponse({ ...result , status: "SUCCESS", error: "" });
        

    }
    catch (error) {
        return parseServerActionResponse({ status: "Error", error: JSON.stringify(error) });
    }


}
export async function toggleBookmark(userId: string, startupId: string) {
  try {
    if (!userId || !startupId) {
      return { success: false, message: "Missing IDs" };
    }
    
    // ✅ Use read client here
    const user = await client.fetch(
      `*[_type == "author" && _id == $userId][0]{bookmarks[]-> {_id}}`,
      { userId }
    );

    const isBookmarked = user?.bookmarks?.some((b: any) => b._id === startupId);

    if (isBookmarked) {
      // ✅ Remove bookmark
      await writeClient
        .patch(userId)
        .unset([`bookmarks[_ref=="${startupId}"]`])
        .commit();
    } else {
      // ✅ Add bookmark
      await writeClient
        .patch(userId)
        .setIfMissing({ bookmarks: [] })
        .append("bookmarks", [{ _type: "reference", _ref: startupId }])
        .commit();
    }

    return { success: true, isBookmarked: !isBookmarked };
  } catch (error) {
    console.error("Bookmark toggle failed:", error);
    return { success: false, message: String(error) };
  }
}