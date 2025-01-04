import React, { HtmlHTMLAttributes } from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset';
import {Search} from "lucide-react";

const SearchForm = ({query} : {qurey?: String}) => {

  return (
    <Form action="/" className='search-form' scroll={false}>
      <input 
      name='query'
      className='search-input'
      placeholder='Search Startups' />
        
      <div className='flex gap-2'>
        {query && <SearchFormReset /> }
      </div>

      <button type='submit' className="search-btn text-white">
        <Search className='size-5'/>
      </button>

      
    </Form>
  ) 
}

export default SearchForm
