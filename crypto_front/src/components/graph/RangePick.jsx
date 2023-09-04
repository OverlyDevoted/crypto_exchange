import React, { useState } from 'react'

export const RangePick = (props) => {
  const ranges = ['1h', '1d', '1w', '1M']
  
  async function submitRange(value) {
    console.log(value);
    const data = await props.data(props.symbol,value);
    props.setter(data);
  }
  return (
    <div>
      {ranges.map((value, index) => {
        return (<button key={index} onClick={(e) => {
          submitRange(e.target.textContent)
        }}>
          {value}
        </button>)
      })
      }
    </div>
  )
}
