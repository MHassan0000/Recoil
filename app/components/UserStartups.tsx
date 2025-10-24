import React from 'react'
import { STARTUPS_BY_AUTHOR_ID_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import Card, { CardType } from './Card'

const UserStartups = async ({id , authorName} : {id :string , authorName : string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_ID_QUERY, { id })

  return (
    <>
        {startups.length > 0 ? (
                      startups.map((item: CardType) => (
                        <Card key={item._id} post={item} />
                      ))
                  ) : (
                    <p className="text-gray-400 text-lg mt-5">
                      No startups found for “{authorName}”.
                    </p>
                  )}
    
    
    </>

  )
}

export default UserStartups