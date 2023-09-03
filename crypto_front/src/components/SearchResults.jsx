import React, { useEffect, useState } from 'react'
import "../styles/SearchResults.css"
import { SearchItem } from './SearchItem'
export const SearchResults = (props) => {

  const [filtered, setFiltered] = useState(props.currencies);
  useEffect(() => {
    if (props.searchQuery) {
      setFiltered(props.currencies.filter(function (value) { return value.code.toLowerCase().includes(props.searchQuery) }));
    }
  }, [props.searchQuery])

  if (filtered && props.searchQuery) {
    if (filtered.length < 1)
      return <></>
    return (
      <div className='results'>
        <ul>
          {filtered ? filtered.map((currency, index) => {
            return (<SearchItem key={index} currency={currency.code} setQuery={props.setQuery} />)
          }) : <></>}
        </ul>
      </div>
    )
  }
  else {
    return <></>
  }
}
