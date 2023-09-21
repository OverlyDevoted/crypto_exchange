import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSearchParams } from "react-router-dom";

import { SearchResults } from './SearchResults'
import ErrorBar from './ErrorBar'
import './../../styles/components/SearchResults.css'


export const SearchBar = (props) => {
    const [message, setMessage] = useState("");
    const [cookie, setCookies] = useCookies("uuid");

    let [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search");

    const abort = new AbortController();
    async function handleSearchSubmit(searchValue) {
        abort.abort();
        const signal = abort.signal;

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
            const query = search.replace('/', '%F2')
            props.setSymbol(search);

            console.log("Sending user action");
            await fetch(`http://localhost:3000/api?value=${query}&user=${encodeURIComponent(cookie.uuid)}&action=search`, { signal: signal, method: 'POST' })
                .catch(err => {
                    if (err.name === "AbortError") {
                        console.log("canceled")
                    } else {
                        //handle errors 
                    }
                });
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

    useEffect(() => {
        if (!props.array)
            return;
        setSearchParams({ search: search })
        handleSearchSubmit(search)
    }, [props.array])

    return (
        <>
            <ErrorBar message={message} />
            <div className='search-container'>
                <input
                    type="text"
                    name="search"
                    id="search-bar"
                    autoComplete='false'
                    value={search}
                    onChange={e => {
                        setSearchParams({ search: e.target.value });
                    }} />
                <button type='submit' onClick={() => { handleSearchSubmit(search) }}>Search</button>
                <SearchResults currencies={props.array} searchQuery={search} />
            </div>
        </>
    )
}
