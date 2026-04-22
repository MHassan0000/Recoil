import React from 'react'
import { STARTUPS_BY_AUTHOR_ID_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { BOOKMARKS_BY_AUTHOR_ID_QUERY } from '@/sanity/lib/queries'
import { auth } from '@/auth'
import Card from './Card'
import { unstable_noStore as noStore } from 'next/cache'

const UserStartups = async ({id , authorName} : {id :string , authorName : string}) => {
    noStore()

    const session = await auth()
    const currentUserId = session?.user?.id ?? null
    const [startups, bookmarkedData] = await Promise.all([
      client.withConfig({ useCdn: false }).fetch(STARTUPS_BY_AUTHOR_ID_QUERY, { id }),
      currentUserId
        ? client.withConfig({ useCdn: false }).fetch(BOOKMARKS_BY_AUTHOR_ID_QUERY, { id: currentUserId })
        : Promise.resolve(null),
    ])
    const bookmarkedIds = (bookmarkedData?.bookmarks ?? []).flatMap((bookmark) => (bookmark?._id ? [bookmark._id] : []))
    const displayName = authorName?.trim() || "this user"

  return (
    <>
        {startups.length > 0 ? (
                      startups.map((item) => (
                        <Card key={item._id} post={{ ...item, isBookmarked: bookmarkedIds.includes(item._id) }} />
                      ))
                  ) : (
                    <p className="text-gray-400 text-lg mt-5">
                      No startups found for “{displayName}”.
                    </p>
                  )}
    
    
    </>

  )
}

export default UserStartups
