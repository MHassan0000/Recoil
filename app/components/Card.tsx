import React from 'react'
import { CardBody, CardContainer, CardItem } from "../components/3dcard";


interface CardProps {
  title: string;
  subtext: string;
  date: string;
  image: string;
}
const Card:React.FC<CardProps> = ({title, subtext,date,image}  ) => {
  return (
     <CardContainer className="">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
      <div className='flex justify-between items-center'>

        <div className='text-lg text-center w-2/5 border-1 border-white py-2 px-4 rounded-full bg-pink-300 mb-5'>
            {date}
        </div>
        <div className='invert cursor-pointer hover:scale-105'>
            <img width={30} src="/images/bookmark.png" alt="bookmark" />
        </div>
      </div>
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="30"
          className="text-neutral-500 mb-10 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {subtext}
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={0}
          rotateZ={0}
          className="w-full mt-4"
        >
          <img
            src={image}
            height="750"
            width="750"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={10}
            translateX={-10}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={10}
            translateX={10}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Details
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}

export default Card