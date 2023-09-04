import React from 'react'
import { Chart } from "react-google-charts";

export const options = {
    legend: "none",
};

export const CurrencyElement = (props) => {
    
    if(!props.data)
    return <></>
    return (
        <Chart
            chartType="CandlestickChart"
            width="100%"
            height="400px"
            data={props.data}
            options={options}
        />
    )
}
