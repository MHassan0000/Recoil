import React from 'react'
import Card from '../components/Card'
import { cardsData } from '../constants/constants'
const Startups = () => {
  return (
     <>
      <section className='flex flex-row justify-center items-center flex-wrap gap-10'>
        {cardsData.map((item) => (
        <Card key={item.id} {...item} />
      ))}
      </section>
     </>
  )
}

export default Startups