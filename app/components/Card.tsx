"use client";

import React, { useState, useTransition } from "react";
import { CardBody, CardContainer, CardItem } from "../components/3dcard";
import { formatDate } from "@/lib/utils";
import { STARTUPS_QUERY_RESULT } from "../../sanity/types";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { toggleBookmark } from "@/lib/actions";
import { Bookmark } from "lucide-react";

export type CardType = STARTUPS_QUERY_RESULT[number] & {
  isBookmarked?: boolean;
};

const Card = ({ post }: { post: CardType }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Initialize bookmark state
  const [isBookmarked, setIsBookmarked] = useState<boolean>(!!post.isBookmarked);

  const userId = session?.user?.id ?? null;

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

      if (result?.success || result?.removed) {
        const nextState =
          typeof result?.isBookmarked === "boolean"
            ? result.isBookmarked
            : result.removed
            ? false
            : !isBookmarked;

        setIsBookmarked(!!nextState);

        if (nextState) {
          toast.success("Added to your bookmarks!");
        } else {
          toast.success("Removed from your bookmarks!");
          // Refresh ONLY if we are inside the bookmarks page
          if (pathname.includes("/Bookmark")) {
            startTransition(() => router.refresh());
          }
        }
      } else {
        toast.error(result?.message || "Something went wrong while toggling bookmark.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <CardContainer>
      <CardBody
        className={
          `bg-gray-50 relative group/card
          dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]
          dark:bg-black dark:border-white/[0.2] border-black/[0.1]
          w-full sm:max-w-[30rem] md:max-w-[35rem]
          rounded-xl p-6 border
          min-h-[22rem] md:h-[40rem]
          flex flex-col justify-between`
        }
      >
        {/* ===== Header ===== */}
        <div className="flex justify-between items-center mb-4 shrink-0">
          <div className="text-lg text-center py-2 px-4 rounded-full bg-orange-500 text-white">
            {formatDate(date)}
          </div>

          {/* ===== Bookmark Icon ===== */}
          <button
            onClick={handleBookmarkClick}
            disabled={isPending}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isBookmarked
                ? "text-yellow-400 hover:text-yellow-500 bg-yellow-400/10"
                : "text-gray-400 hover:text-gray-300"
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
          >
            <Bookmark
              size={26}
              className={`transition-all duration-300 ${
                isBookmarked ? "fill-yellow-400 scale-110" : "fill-none"
              }`}
            />
          </button>
        </div>

        {/* ===== Title ===== */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white shrink-0 cursor-pointer"
        >
          <Link href={`/Startup/${id}`}>{title}</Link>
        </CardItem>

        {/* ===== Description ===== */}
        <CardItem
          as="p"
          translateZ="30"
          className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 leading-relaxed line-clamp-3 overflow-hidden"
        >
          {subtext}
        </CardItem>

        {/* ===== Author Section ===== */}
        <CardItem
          translateZ="30"
          className="text-white font-bold text-lg dark:text-neutral-300 shrink-0 cursor-pointer w-full"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Link href={`/User/${author?._id ?? "#"}`} className="flex items-center gap-3">
                <Image
                  src={author?.image || "/images/user.png"}
                  alt={author?.name || "Unknown Author"}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border border-white/30 hover:scale-105 transition-transform"
                />
                <span className="text-neutral-800 dark:text-neutral-200">
                  {author?.name || "Unknown"}
                </span>
              </Link>
            </div>

            <Link href={`/?query=${category?.toLowerCase()}`}>
              <p className="text-sm font-bold dark:text-neutral-500">{category}</p>
            </Link>
          </div>
        </CardItem>

        {/* ===== Image ===== */}
        <CardItem translateZ="100" className="w-full mt-2 mb-4 shrink-0">
          <Link href={`/Startup/${id}`}>
            <Image
              src={post.image ?? "/images/placeholder.png"}
              height={750}
              width={750}
              className="h-48 sm:h-56 md:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-all duration-300 cursor-pointer"
              alt={title}
            />
          </Link>
        </CardItem>

        {/* ===== Footer Controls ===== */}
        <div className="flex justify-between items-center mt-4 shrink-0">
          <CardItem
            translateZ={10}
            translateX={-10}
            as="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-base font-medium dark:text-white"
          >
            <Image className="invert w-[24px]" src="/images/visible.png" alt="Views" width={24} height={24} />
            {views}
          </CardItem>

          <CardItem
            translateZ={10}
            translateX={10}
            as="button"
            className="
              px-5 py-3 rounded-full text-xs font-bold
              bg-black text-white dark:bg-white dark:text-black
              hover:bg-pink-600 hover:text-white hover:scale-105
              transition-all duration-200 cursor-pointer
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
