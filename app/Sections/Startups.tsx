import React from 'react'
import Card from '../components/Card'
import { cardsData } from '../constants/constants'
import TitleHeader from '../components/TitleHeader'
const Startups = () => {
  return (

    <>

      <section className='mt-20 flex  justify-center items-center flex-wrap gap-x-15'>
        <div className="w-full h-full md:px-10 px-15">
          <TitleHeader
            title="Recommended Startups"
            showLine={false}
          
          />
        </div>
        {cardsData.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </section>
    </>
  )
}

export default Startups