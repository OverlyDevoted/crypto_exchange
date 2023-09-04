import React from 'react'
import './../styles/SearchResults.css'
const ErrorBar = (props) => {
    if (props.message) {
        return (<div className='error-message'>{props.message}</div>);
    }
    else
        return (
            <br/>
    )
}
export default ErrorBar;
