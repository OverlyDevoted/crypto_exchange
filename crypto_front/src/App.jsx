import './styles/App.css'

import ccxt from 'ccxt'

import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import { SearchBar } from './components/seach/SearchBar'
import { RangePick } from './components/graph/RangePick';
import { CurrencyElement } from './components/graph/CurrencyElement';



async function getCurrencies(curFunction) {
  const exchange = new ccxt.binance({});
  await exchange.loadMarkets();
  console.log(await exchange.currencies);
  const currencies = await Object.values(exchange.markets).map(currency => ({
    code: currency.symbol,
  }));
  currencies.sort();
  curFunction(currencies);
  console.log(currencies);
}
async function getOHLCV(symbol, range) {
  //range string validation
  const exchange = new ccxt.binance({});

  if (exchange.has.fetchOHLCV) {
    
    const rawData = await exchange.fetchOHLCV(symbol, range.interval, undefined, range.limit);

    let processedData = rawData.map((arr, index) => {
      let resArr = []
      resArr.push(new Date(arr[0]).toLocaleString())
      resArr.push(arr[3]);
      resArr.push(arr[1]);
      resArr.push(arr[4]);
      resArr.push(arr[2]);

      return resArr;
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
  const [currencies, setCurrencies] = useState();     // All symbols fetched on first render
  const [symbolData, setSymbolData] = useState();     // Price data for searched and time range selected symbol 
  const [symbol, setSymbol] = useState();             // Searched symbol
  const [isLoading, setLoading] = useState(false);    
  const [cookies, setCookie] = useCookies(['uuid']);  
  
  function setNewSymbol(value) {
    setSymbolData();
    setSymbol(value);
  }
  useEffect(() => {
    if (!cookies.uuid) {
      //assuming that self.crypto.randomUUID(); is available
      const uuid = self.crypto.randomUUID();
      console.log("Setting custom UUID " + uuid)
      setCookie("uuid", uuid, { path: '/', expires: new Date(Date.now() + 2592000 * 1000) });
    }
    if (!currencies) {
      getCurrencies(setCurrencies);
    }
  }, [currencies, symbolData])

  return (
    <main>
      <section>
        <header>
          <h1>Cryptocurrency price finder</h1>
        </header>

        <SearchBar array={currencies} setSymbol={setNewSymbol} />
        <div className='helper-text'>{symbol ? `${symbol} Prices` : `Search for a symbol`}</div>
        
        {symbol ? <RangePick data={getOHLCV} setter={setSymbolData} symbol={symbol} onStart={() => { setLoading(true) }}
          onEnd={() => { setLoading(false) }} /> : <></>}
      </section>
      <CurrencyElement data={symbolData} symbol={symbol} loading={isLoading} />
      <footer>Copyright @ 2023 Robert Dulko 💖</footer>
    </main>
  )
}

export default App
