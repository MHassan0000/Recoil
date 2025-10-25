import React from "react";
import { client } from "@/sanity/lib/client";
import { BOOKMARKS_BY_AUTHOR_ID_QUERY } from "@/sanity/lib/queries";
import Card, { CardType } from "./Card";

interface UserBookmarksProps {
  id: string;
  authorName: string;
}

const UserBookmarks = async ({ id, authorName }: UserBookmarksProps) => {
  
  const bookmarksData = await client.fetch(BOOKMARKS_BY_AUTHOR_ID_QUERY, { id });
  const bookmarks = bookmarksData?.bookmarks || [];

  return (
    <>
      {bookmarks.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center mt-5 gap-10">
          {bookmarks.map((startup: CardType) => (
            <Card key={startup._id} post={startup} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-lg mt-5 text-center">
          No bookmarks found for <span className="font-semibold text-yellow-400">“{authorName}”</span>.
        </p>
      )}
    </>
  );
};

export default UserBookmarks;
