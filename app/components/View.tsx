import { client } from "@/sanity/lib/client";
import { STARTUP_BY_VIEWS } from "@/sanity/lib/queries";
import { Eye } from "lucide-react";

export default async function View({ id }: { id: string }) {

  const data = await client.fetch(
    STARTUP_BY_VIEWS,
    { id }
  );

  const views = data?.views || 0;

  return (
    <span className="flex items-center gap-1 text-gray-400">
      <Eye size={16} /> {views} views
    </span>
  );
}
