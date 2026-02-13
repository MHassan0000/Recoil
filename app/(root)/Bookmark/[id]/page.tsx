import React from "react";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import UserBookmarks from "../../../components/UserBookmarks"

export const revalidate = 30; // Revalidate bookmarks page every 30 seconds

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  
  const author = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!author) return notFound();

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0e0e10] via-[#111] to-[#1a1a1d] text-white px-6 py-20 md:px-16 transition-all duration-500">
      {/* ===== Header Section ===== */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
          Your Bookmarked Startups
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Here are all the startups you’ve saved. Revisit your favorite projects anytime, stay inspired, and discover what’s next.
        </p>
        <div className="mt-6 h-px w-40 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 mx-auto opacity-70"></div>
      </div>

      {/* ===== Bookmarked Cards Section ===== */}
      <div className="max-w-full mx-auto">
        <UserBookmarks id={id} authorName={author?.name} />
      </div>

      {/* ===== Footer Accent ===== */}
      <div className="relative max-w-6xl mx-auto mt-28">
        <div className="h-px bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 opacity-50"></div>
        <p className="text-center text-gray-600 text-sm mt-6">
          © {new Date().getFullYear()} Recoil. All rights reserved.
        </p>
      </div>
    </section>
  );
}
