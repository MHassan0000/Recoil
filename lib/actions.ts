"use server"
import {auth }from "@/auth";
import { parseServerActionResponse } from "./utils";
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