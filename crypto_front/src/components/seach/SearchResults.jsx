import React, { useEffect, useState } from 'react'
import "./../../styles/components/SearchResults.css"
import { SearchItem } from './SearchItem'
export const SearchResults = (props) => {

  const [filtered, setFiltered] = useState(props.currencies? props.currencies:[] );
  const max_entries = 20;
  useEffect(() => {
    if (props.searchQuery && props.currencies) {
      const filteredTemp = props.currencies.filter(function (value) { return value.code.toLowerCase().includes(props.searchQuery) });
      const string_arr = filteredTemp.map((value, index) => { return value.code })
      string_arr.sort();
      console.log(string_arr);
      setFiltered(string_arr);
    }
  }, [props.searchQuery])
  if(!filtered)
  return <></>
  if(filtered.length > 1)
  {
    return (
      <div className='results'>
        <ul>
          {
            filtered ?
              filtered.map(
                (currency, index) => {
                  return (<SearchItem key={index} currency={currency} />)
                }
              ) : <></>
          }
        </ul>
      </div>
    )
  }
}
