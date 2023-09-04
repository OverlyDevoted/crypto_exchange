import React from 'react'
import './../../styles/components/SearchResults.css'
const ErrorBar = (props) => {
    return (<div className='error-message'>{props.message ? props.message : <br />}</div>);
}
export default ErrorBar;
