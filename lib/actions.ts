"use server"
import {auth }from "@/auth";
import { parseServerActionResponse } from "./utils";
import { client } from "@/sanity/lib/client";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { getImageFileError, startupTextSchema } from "./validation";
import { revalidatePath } from "next/cache";
import { revalidateSyncTags } from "next-sanity";

type CreateStartupResult = {
  id?: string;
  error: string;
  status: "SUCCESS" | "ERROR";
  fieldErrors?: Record<string, string>;
};

export const createStartup = async (form: FormData): Promise<CreateStartupResult> =>{

    const session = await auth();
    if(!session){
        return  parseServerActionResponse({
          status: "ERROR",
          error: "NOT SIGNED IN",
          fieldErrors: {},
        });
    }

    const title = (form.get("title") as string | null) ?? "";
    const description = (form.get("description") as string | null) ?? "";
    const category = (form.get("category") as string | null) ?? "";
    const pitch = (form.get("pitch") as string | null) ?? "";
    const imageFile = form.get("image") as File | null;

    const parsed = startupTextSchema.safeParse({
      title,
      description,
      category,
      pitch,
    });

    const imageError = getImageFileError(imageFile);

    if (!parsed.success || imageError) {
      const fieldErrors: Record<string, string> = {};

      if (!parsed.success) {
        const flattened = parsed.error.flatten().fieldErrors;
        Object.entries(flattened).forEach(([key, value]) => {
          if (value?.[0]) {
            fieldErrors[key] = value[0];
          }
        });
      }

      if (imageError) {
        fieldErrors.image = imageError;
      }

      return parseServerActionResponse({
        status: "ERROR",
        error: "Validation failed",
        fieldErrors,
      });
    }

    const { data } = parsed;
    const slug = slugify(title as string , {lower : true , strict : true});

    try {
        const uploadedImage = await writeClient.assets.upload("image", imageFile as File, {
          filename: `${slug || "startup"}.${(imageFile?.name.split(".").pop() || "jpg").toLowerCase()}`,
          contentType: imageFile?.type,
        });

        const startup  = {
            title: data.title,
            description: data.description,
            category: data.category,
            image: {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: uploadedImage._id,
                },
            },
            slug : {
                _type: 'slug',
                current: slug,
            },
            author : {
                _type: 'reference',
                _ref: session?.user?.id,
            },
            pitch: data.pitch,
        };

            const result = await writeClient.create({
                _type: 'startup',
                ...startup,
            });

            await revalidateSyncTags(["sanity"]);
            revalidatePath("/");
            revalidatePath("/Startup/Create");

            return parseServerActionResponse({
              id: result._id,
              status: "SUCCESS",
              error: "",
              fieldErrors: {},
            });
         

    }
    catch (error) {
        return parseServerActionResponse({
          status: "ERROR",
          error: error instanceof Error ? error.message : "Failed to create startup",
          fieldErrors: {},
        });
    }


}
export async function toggleBookmark(userId: string, startupId: string, shouldBookmark?: boolean) {
  try {
    if (!userId || !startupId) {
      return { success: false, message: "Missing IDs" };
    }

    
    let user = await client.withConfig({ useCdn: false }).fetch(
      `*[_type == "author" && _id == $userId][0]{_id, bookmarks[]-> {_id}}`,
      { userId }
    );

    if (!user) {
      const possible = await client.withConfig({ useCdn: false }).fetch(
        `*[_type == "author" && id == $userId][0]{_id, bookmarks[]-> {_id}}`,
        { userId }
      );
      user = possible;
    }

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const sanityUserId = user._id;
    const isBookmarked = user?.bookmarks?.some((b: { _id: string }) => b._id === startupId);
    const targetState = typeof shouldBookmark === "boolean" ? shouldBookmark : !isBookmarked;

    if (!targetState) {
      await writeClient
        .patch(sanityUserId)
        .unset([`bookmarks[_ref=="${startupId}"]`])
        .commit();

      revalidatePath("/");
      revalidatePath(`/Bookmark/${sanityUserId}`);
      revalidatePath(`/User/${sanityUserId}`);

      return { success: true, removed: true, isBookmarked: false };
    }

    if (!isBookmarked) {
      await writeClient
        .patch(sanityUserId)
        .setIfMissing({ bookmarks: [] })
        .append("bookmarks", [{ _type: "reference", _ref: startupId }])
        .commit();
    }

    revalidatePath("/");
    revalidatePath(`/Bookmark/${sanityUserId}`);
    revalidatePath(`/User/${sanityUserId}`);

    return { success: true, removed: false, isBookmarked: true };
  } catch (error) {
    console.error("Bookmark toggle failed:", error);
    return { success: false, message: String(error) };
  }
}
