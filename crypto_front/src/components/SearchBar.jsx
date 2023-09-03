import { useState } from 'react'
import './../styles/SearchResults.css'
import { SearchResults } from './SearchResults'


export const SearchBar = (props) => {
    const [searchQuery, setQuery] = useState("");
    function handleSearchSubmit(searchValue) {
        if (props.array.find((element) => element.code == searchValue)) {
            alert(searchValue + " is within dataset");
        }
        else
            alert("Could not find " + searchValue);
    }
    return (
        <>
            <div className='search-container'>
                <input
                    type="text"
                    name="search"
                    id="search-bar"
                    autoComplete='false'
                    value={searchQuery}
                    onChange={e => {
                        setQuery(e.target.value);
                    }} />
                <button type='submit' onClick={() => { handleSearchSubmit(searchQuery) }}>Search</button>
            </div>

            <SearchResults currencies={props.array} setQuery={setQuery} searchQuery={searchQuery} />
        </>
    )
}
