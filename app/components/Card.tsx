"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../components/3dcard";
import { formatDate } from "@/lib/utils";
import { Startup, Author } from "../../sanity/types";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import { toggleBookmark } from "@/lib/actions"; // adjust import path if needed

export type CardType = Omit<Startup, "author"> & { author?: Author };

const Card = ({ post }: { post: CardType }) => {
  const { data: session } = useSession();

  const userId: string | null =
    (session as any)?.user?.id ?? (session as any)?.id ?? null;
  const id = post._id ?? "";
  const title = post.title ?? "";
  const subtext = post.description ?? "";
  const category = post.category ?? "";
  const date = post._createdAt ?? "";
  const views = post.views ?? 0;
  const author = post.author ?? undefined;

  const handleBookmarkClick = async () => {
    if (!session || !userId) {
      toast.info("Please log in to bookmark startups.");
      return;
    }

    try {
      const result = await toggleBookmark(userId, id);
      if (result?.success) {
        toast.success(
          result.isBookmarked
            ? "Added to your bookmarks!"
            : "Removed from your bookmarks!"
        );
      } else {
        toast.error("Something went wrong while toggling bookmark.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <CardContainer>
      <CardBody
        className="
          bg-gray-50 relative group/card
          dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]
          dark:bg-black dark:border-white/[0.2] border-black/[0.1]
          sm:w-[35rem] w-full max-w-[30rem]
          rounded-xl p-6 border
          h-[40rem]
          flex flex-col justify-between
        "
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4 shrink-0">
          <div className="text-lg text-center py-2 px-4 rounded-full bg-orange-500 text-white">
            {formatDate(date)}
          </div>

          {/* Bookmark */}
          <div
            className="invert cursor-pointer hover:scale-105 transition-transform"
            onClick={handleBookmarkClick}
          >
            <img width={30} src="/images/bookmark.png" alt="bookmark" />
          </div>
        </div>

        {/* Title */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white shrink-0 cursor-pointer"
        >
          <Link href={`/Startup/${id}`}>{title}</Link>
        </CardItem>

        {/* Subtext */}
        <CardItem
          as="p"
          translateZ="30"
          className="
            text-neutral-500 text-sm mt-2 dark:text-neutral-300 leading-relaxed
            line-clamp-3 overflow-hidden
          "
        >
          {subtext}
        </CardItem>

        {/* Author Section */}
        <CardItem
          translateZ="30"
          className="text-white font-bold text-lg dark:text-neutral-300 shrink-0 cursor-pointer w-full"
        >
          {author?._id ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Link href={`/User/${author._id}`} className="flex items-center gap-3">
                  <img
                    src={author.image ? author.image : "/images/user.png"}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border border-white/30 hover:scale-105 transition-transform"
                  />
                  <span className="text-neutral-800 dark:text-neutral-200">
                    {author.name}
                  </span>
                </Link>
              </div>

              <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className="text-sm font-bold dark:text-neutral-500">{category}</p>
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <img
                  src="/images/user.png"
                  alt="Unknown Author"
                  className="w-8 h-8 rounded-full invert object-cover border border-white/30"
                />
                <span className="text-neutral-800 dark:text-neutral-200">
                  {author?.name || "Unknown"}
                </span>
              </div>

              <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className="text-sm font-bold dark:text-neutral-500">{category}</p>
              </Link>
            </div>
          )}
        </CardItem>

        {/* Image */}
        <CardItem translateZ="100" className="w-full mt-2 mb-4 shrink-0">
          <Link href={`/Startup/${id}`}>
            <img
              src={post.image ?? "/images/placeholder.png"}
              height="750"
              width="750"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-all duration-300 cursor-pointer"
              alt={title}
            />
          </Link>
        </CardItem>

        {/* Bottom Controls */}
        <div className="flex justify-between items-center mt-4 shrink-0">
          <CardItem
            translateZ={10}
            translateX={-10}
            as="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-base font-medium dark:text-white"
          >
            <img className="invert w-[24px]" src="/images/visible.png" alt="Views" />
            {views}
          </CardItem>

          <CardItem
            translateZ={10}
            translateX={10}
            as="button"
            className="
              px-5 py-3 rounded-full
              text-xs font-bold
              bg-black text-white
              dark:bg-white dark:text-black
              hover:bg-pink-600 hover:text-white
              hover:scale-105 transition-all duration-200 cursor-pointer
            "
          >
            <Link href={`/Startup/${id}`}>Details</Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default Card;
