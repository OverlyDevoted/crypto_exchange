import React from 'react'
function handleClick(e) {
    alert(e.target.textContent);
}
export const SearchItem = (props) => {
    if (props.currency)
        return (<li onClick={e => props.setQuery(e.target.textContent)}>{props.currency}</li>)
    else
        <></>

}
