import React from 'react'
import { useSearchParams } from 'react-router-dom';
function handleClick(e) {
    alert(e.target.textContent);
}
export const SearchItem = (props) => {
    
    let [searchParams, setSearchParams] = useSearchParams();
    if (props.currency)
        return <li key={props.key} onClick={e => setSearchParams({search:e.target.textContent})}>{props.currency}</li>
    else
        return <></>

}
export default SearchItem;