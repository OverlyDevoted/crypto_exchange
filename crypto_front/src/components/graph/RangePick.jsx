import './../../styles/components/Graph.css'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

export const RangePick = (props) => {

  const [cookie, setCookie] = useCookies(['uuid']);
  const ranges = [{label:'1H', interval:"1m", limit:"60"}, {label:'1D', interval:"15m", limit:"96"}, {label:'1M', interval:"1d", limit:"30"}, {label:'1Y', interval:"1d", limit:"365"}]

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
          submitRange(ranges[index])
        }}>
          {value.label}
        </button>)
      })
      }
    </div>
  )
}
