import { client } from "@/sanity/lib/client";
import { STARTUP_BY_VIEWS } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { Eye } from "lucide-react";

export default async function View({ id }: { id: string }) {
  // Disable CDN to always get fresh dynamic data
  const startup = await client.withConfig({ useCdn: false }).fetch(
    STARTUP_BY_VIEWS,
    { id }
  );
  const views = startup?.views ?? 0;
  


  await writeClient
    .patch(id)
    .setIfMissing({ views: 0 })
    .set({ views: views + 1 })
    .commit();

  return (
    <span
      className="flex items-center gap-2 text-yellow-400 text-md font-semibold
      transition-all duration-500 hover:text-yellow-300 group"
    >
      {/* Animated icon pulse to show dynamic activity */}
      <Eye
        size={20}
        className="animate-pulse group-hover:scale-110 transition-transform duration-300"
      />
      
      {/* Fading count to make it look “live” */}
      <span className="relative inline-block">
        <span
          className="opacity-80 animate-[fadeIn_1s_ease-in-out] transition-opacity duration-300"
        >
          {views} views
        </span>
      </span>
    </span>
  );
}
