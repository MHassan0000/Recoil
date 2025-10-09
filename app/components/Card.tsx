import React from 'react'
import { CardBody, CardContainer, CardItem } from "../components/3dcard";
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface Author {
  id: string | number;
  name: string;
}

interface CardProps {
  id: string | number;
  title: string;
  subtext: string;
  author: Author;
  category: string;
  date: string;
  image: string;
  views?: number;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  subtext,
  author,
  category,
  date,
  image,
  views
}) => {
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
          <div className="invert cursor-pointer hover:scale-105 transition-transform">
            <img width={30} src="/images/bookmark.png" alt="bookmark" />
          </div>
        </div>

        {/* Title */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white shrink-0 cursor-pointer"
        >
          <Link href={`/startups/${id}`}>
            {title}
          </Link>
        </CardItem>

        {/* Subtext */}
        <CardItem
          as="p"
          translateZ="30"
          className="
            text-neutral-500 text-sm mt-2 mb-6 dark:text-neutral-300 leading-relaxed
            line-clamp-3 overflow-hidden
          "
        >
          {subtext}
        </CardItem>

        {/* Image */}
        <CardItem translateZ="100" className="w-full mt-2 mb-4 shrink-0">
          <Link href={`/startups/${id}`}>
            <img
              src={image}
              height="750"
              width="750"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-all duration-300 cursor-pointer"
              alt={title}
            />
          </Link>
        </CardItem>

        {/* Author */}
        <CardItem
          translateZ="30"
          className="text-white font-bold text-lg mt-2 dark:text-neutral-300 shrink-0 cursor-pointer"
        >
          {author?.id ? (
            <Link href={`/authors/${author.id}`}>
              Author: {author.name}
            </Link>
          ) : (
            <span>Author: {author.name}</span>
          )}
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

          <Link href={`/startups/${id}`}>
            <CardItem
              translateZ={10}
              translateX={10}
              as="button"
              className="
                px-5 py-3 rounded-xl
                text-xs font-bold
                bg-black text-white
                dark:bg-white dark:text-black
                hover:bg-pink-600 hover:text-white
                hover:scale-105 transition-all duration-200 cursor-pointer
              "
            >
              Details
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default Card;
