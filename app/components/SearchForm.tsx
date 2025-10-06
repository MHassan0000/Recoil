import React from 'react'
import Form from "next/form"

const SearchForm = () => {
  const query = "Real";
  return (
    <>
      <Form action={"/"} scroll={false} className='search-form w-full text-white'>
        <input
        name='query'
        defaultValue={query}
        className='search-input'
        placeholder='Search Startups'
        
        />

      </Form>
    </>
  )
}

export default SearchForm