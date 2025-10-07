import React from 'react'
import Form from "next/form"
import ResetForm from './ResetForm';



const SearchForm = ({query} : {query : string}) => {
  
 
  return (
    <>
      <Form action={"/"} scroll={false} className='search-form w-full text-white'>
        <input
        name='query'
        defaultValue={query}
        className='search-input'
        placeholder='Search Startups'
        
        />
        <div className='flex gap-2'>
            {query && (
                <ResetForm/>
              
            )}
            <button type="submit" className='search-btn text-black font-extrabold'>
                S
            </button>

        </div>

      </Form>
    </>
  )
}

export default SearchForm