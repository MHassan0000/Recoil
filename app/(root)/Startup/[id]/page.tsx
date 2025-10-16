import React, { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import View from "../../../components/View";
import { Skeleton } from "@/app/components/skeleton";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch startup details by ID
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0e0e10] via-[#111] to-[#1a1a1d] text-white px-6 py-16 md:px-20">
      {/* ===== Header Section ===== */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <div className="inline-block bg-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          {new Date(post._createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          {post.title}
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          {post.description || "No description available"}
        </p>
      </div>

      {/* ===== Hero Image ===== */}
      {post.image && (
        <div className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative hover:scale-110 transition-transform duration-300">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-[400px] md:h-[500px]"
          />
        </div>
      )}

      {/* ===== Details Section ===== */}
      <div className="max-w-5xl mx-auto bg-[#171717] rounded-3xl shadow-lg p-8 md:p-12 border border-gray-800">
        <div className="flex flex-wrap items-center justify-between mb-6">
          {/* Author Info */}
          <div className="flex items-center gap-4">
            {post.author?.image && (
              <img
                src={post.author.image}
                alt={post.author?.name}
                className="w-[60px] h-[60px] rounded-full border-2 border-yellow-400 object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{post.author?.name}</h3>
              <p className="text-gray-400 text-sm">@{post.author?.username}</p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-6 text-gray-400 text-sm mt-4 md:mt-0">
            <span className="flex items-center gap-1">
              <CalendarDays size={16} />{" "}
              {new Date(post._createdAt).toLocaleDateString()}
            </span>

            {/* ===== Dynamic Views via Suspense ===== */}
            <Suspense
              fallback={
                
                <Skeleton className="h-5 w-24 rounded-md" />
              }
            >
              <View id={id} />
            </Suspense>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        {/* ===== Pitch Section ===== */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Startup Pitch
          </h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {post.pitch ||
              "This startup has not provided a detailed pitch yet."}
          </p>
        </div>

        {/* ===== Category Tag ===== */}
        <div className="mt-10">
          <span className="inline-block bg-yellow-400 text-black font-semibold px-4 py-1.5 rounded-full text-sm">
            {post.category || "Uncategorized"}
          </span>
        </div>
      </div>

      {/* ===== Footer Section ===== */}
      <footer className="relative max-w-5xl mx-auto mt-24">
        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand / Info */}
          <div>
            <h3 className="text-5xl font-bold text-yellow-400 tracking-tight">
              Re<span className="text-white">coil</span>
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Empowering founders to share, grow, and inspire the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-5 text-sm text-gray-400 font-medium">
            <a
              href="/"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/startups"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Startups
            </a>
            <a
              href="/about"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="/contact"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-10 flex justify-center gap-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-800 text-gray-400 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
          >
            <i className="ri-twitter-fill text-lg"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-800 text-gray-400 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
          >
            <i className="ri-linkedin-fill text-lg"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-800 text-gray-400 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
          >
            <i className="ri-github-fill text-lg"></i>
          </a>
        </div>

        {/* Bottom Note */}
        <div className="text-center text-gray-600 text-sm mt-10 pb-6">
          © {new Date().getFullYear()} Startup Showcase. All rights reserved.
        </div>

        {/* Background Gradient Accent */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 opacity-50"></div>
      </footer>
    </section>
  );
}
