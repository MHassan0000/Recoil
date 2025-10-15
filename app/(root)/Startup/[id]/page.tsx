import React from 'react'
import {client} from '@/sanity/lib/client'
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation';


const page = async ({params} : {params : Promise<{id: string}>}) => {
    const id = (await params).id
    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});
    if(!post){
        return notFound();
    }
  return (
    <>
        <div className='text-3xl'>startup page for {post.title}</div>
        
    
    </>
  )
}

export default page