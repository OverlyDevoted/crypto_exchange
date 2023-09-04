import { useState, useRef, useEffect } from 'react'
import './../styles/SearchResults.css'
import { SearchResults } from './SearchResults'
import ErrorBar from './ErrorBar'

export const SearchBar = (props) => {
    const [searchQuery, setQuery] = useState("");
    const [message, setMessage] = useState("");

    function handleSearchSubmit(searchValue) {
        setMessage("");
        if (searchValue.length >= 30) {
            return new Promise(function (resolve) {
                setTimeout(resolve, 0);
            }).then(() => {
                setMessage(`Input value is too large. Maximum of 30 characters allowed.`);
            })
        }
        else if (props.array.find((element) => element.code == searchValue.toUpperCase())) {
            alert(`${searchQuery.toUpperCase()} is in the dataset`)
            return;
        }
        else {
            return new Promise(function (resolve) {
                setTimeout(resolve, 0);
            }).then(() => {
                setMessage(`Could not find cryptocurrency ${searchValue}`);
            })
        }

    }
    return (
        <>
            <div className='search-container'>
                <ErrorBar message={message} />
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
