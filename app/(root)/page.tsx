import React from 'react'
import Startups from '../Sections/Startups'
import Hero from '../Sections/Hero'
import Footer from '../Sections/Footer'


export default async function  Page({searchParams} :{searchParams : Promise<{query? : any}>}) {
  const query = (await searchParams).query
  return (
    <>
      <Hero  query = {query}/>
      <Startups query={query} />
      <Footer />
    </>
  );
}