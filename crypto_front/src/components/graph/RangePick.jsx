import './../../styles/components/Graph.css'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

export const RangePick = (props) => {

  const [cookie, setCookie] = useCookies(['uuid']);
  const ranges = ['1h', '1d', '1w', '1M']

  async function submitRange(value) {
    props.onStart();
    const data = await props.data(props.symbol, value);
    props.setter(data);
    props.onEnd();
    try {
      console.log("Sending user action");
      const select = props.symbol.replace('/', '%F2');
      const response = await fetch(`http://localhost:3000/api?value=${select}&user=${encodeURIComponent(cookie.uuid)}&action=select`, { method: 'POST' });
      console.log(response);
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <div className='range-container'>
      {ranges.map((value, index) => {
        return (<button className='range-selector' key={index} onClick={(e) => {
          submitRange(e.target.textContent)
        }}>
          {value}
        </button>)
      })
      }
    </div>
  )
}
