import './../../styles/components/Graph.css'
import React, { useEffect } from 'react'
import { Chart } from "react-google-charts";
import { AiOutlineLoading } from 'react-icons/ai';

export const options = {
    legend: "none",
    hAxis: {
        textPosition: 'none',
        textStyle: {
            color: 'black',
        },
    },
    vAxis: {
        textStyle: {
            color: 'white',
        },
    },
    candlestick: {
        fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
        risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
    backgroundColor: '#1a1a1a',
    chartArea: {
        width: "90%"
        // right: '10%'
    },
    width: '95%',
    colors: ['#FFFFFF'],
    explorer: {
        actions: ['dragToZoom', 'rightClickToReset'],
        maxZoomIn: 0.01,
    },
    maintainAspectRatio : false
};

export const CurrencyElement = (props) => {
    useEffect(() => {
    }, [props.data])
    
    if (!props.data)
        return (<div>{props.loading ? <AiOutlineLoading size={300} className='loading' /> : <></>}</div>)
    return (
        <div key={props.key} className='graph-container'>
            {props.data ?
                < Chart
                    chartType="CandlestickChart"
                    width="100%"
                    height="100%"
                    data={props.data}
                    options={options}
                /> : <></>
            }
        </div>

    )
}
