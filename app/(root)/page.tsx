import React from 'react'
import Startups from '../Sections/Startups'
import Hero from '../Sections/Hero'
import Footer from '../Sections/Footer'


export default async function  Page({searchParams} :{searchParams : Promise<{query? : string}>}) {
  const query = (await searchParams).query ?? ""
  return (
    <>
      <Hero />
      <Startups query={query} />
      <Footer />
    </>
  );
}