import { useState } from 'react'
import './../../styles/components/SearchResults.css'
import { SearchResults } from './SearchResults'
import { useCookies } from 'react-cookie'
import ErrorBar from './ErrorBar'


export const SearchBar = (props) => {
    const [searchQuery, setQuery] = useState("");
    const [message, setMessage] = useState("");
    const [cookie, setCookies] = useCookies("uuid");
    async function handleSearchSubmit(searchValue) {
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
            const query = searchQuery.replace('/', '%F2')
            props.setSymbol(searchQuery);
            try {
                console.log("Sending user action");
                await fetch(`http://localhost:3000/api?value=${query}&user=${encodeURIComponent(cookie.uuid)}&action=search`, { method: 'POST' });
            }
            catch (e) {
                console.log(e);
            }
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
                    }} />
                <button type='submit' onClick={() => { handleSearchSubmit(searchQuery) }}>Search</button>
                {props.array ? <SearchResults currencies={props.array} setQuery={setQuery} searchQuery={searchQuery} /> : <></>}
            </div>
        </>
    )
}
