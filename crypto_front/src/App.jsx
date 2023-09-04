import { useState, useEffect } from 'react'
import { SearchBar } from './components/seach/SearchBar'
import './styles/App.css'
import ccxt from 'ccxt'
import { RangePick } from './components/graph/RangePick';
import { CurrencyElement } from './components/graph/CurrencyElement';
let exchange;
async function getCurrencies(curFunction) {
  exchange = new ccxt.binance({});
  await exchange.loadMarkets();
  const currencies = await Object.values(exchange.currencies).map(currency => ({
    code: currency.code,
  }));

  curFunction(currencies);
  console.log(currencies);
}
async function getOHLCV(symbol, range) {
  //range string validation
  exchange = new ccxt.binance({});
  if (exchange.has.fetchOHLCV) {
    // console.log(exchange.timeframes);
    const rawData = await exchange.fetchOHLCV(symbol+'/USDT', range);
    let tempData;
    let processedData = rawData.map((arr)=>{
      if(tempData)
      {
        if(tempData == new Date(arr[0]).toDateString())
        {
          return;
        }
      }
      tempData = new Date(arr[0]).toDateString();
      arr[0] = new Date(arr[0]).toLocaleString()
      
      arr.pop();
      return arr;
    })
    const filteredArray = processedData.filter(function (element) {
      return element !== undefined;
      });
      filteredArray.unshift(["date", "(O)pen price", "(H)ighest price", "(L)owest price", "(C)losing price"]);
    console.log(filteredArray);
    return filteredArray;
  }
}
function App() {
  //remake into symbols
  const [currencies, setCurrencies] = useState();
  const [symbolData, setSymbolData] = useState();
  const [symbol, setSymbol] = useState(false);


  useEffect(() => {
    if (!currencies) {
      getCurrencies(setCurrencies);
    }
  }, [currencies, symbolData])


  return (
    <main>
      <section>
        <h1>Cryptocurrency price finder</h1>
        <SearchBar array={currencies} setSymbol={setSymbol} />
        {symbol ? <RangePick data={getOHLCV} setter={setSymbolData} symbol={symbol} /> : <></>}
        {symbolData ? <div>{symbol}</div> : <div>No data</div>}
        <CurrencyElement data={symbolData} />
      </section>
    </main>
  )
}

export default App
