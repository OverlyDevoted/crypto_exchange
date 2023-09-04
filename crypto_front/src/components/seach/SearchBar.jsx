import { useState, useRef, useEffect } from 'react'
import './../../styles/components/SearchResults.css'
import { SearchResults } from './SearchResults'
/* import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' */
import ErrorBar from './ErrorBar'

export const SearchBar = (props) => {
    const [searchQuery, setQuery] = useState("");
    const [message, setMessage] = useState("");

    function handleSearchSubmit(searchValue) {
        setMessage("");
        props.setSymbol("");
        if (searchValue.length >= 30) {
            return new Promise(function (resolve) {
                setTimeout(resolve, 0);
            }).then(() => {
                setMessage(`Input value is too large. Maximum of 30 characters allowed.`);
            })
        }
        else if (props.array.find((element) => element.code == searchValue.toUpperCase())) {
            props.setSymbol(searchQuery);
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
            <ErrorBar message={message} />
            <div className='search-container'>
                <input
                    type="text"
                    name="search"
                    id="search-bar"
                    autoComplete='false'
                    value={searchQuery}
                    onChange={e => {
                        setQuery(e.target.value);
                    }} >

                </input>
                <button type='submit' onClick={() => { handleSearchSubmit(searchQuery) }}>Search</button>
            </div>
            {props.array ? <SearchResults currencies={props.array} setQuery={setQuery} searchQuery={searchQuery} /> : <></>}
        </>
    )
}
