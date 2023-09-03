import { useState, useEffect } from 'react'
import { SearchBar } from './components/SearchBar'

import ccxt from 'ccxt'
async function getCurrencies(curFunction) {

  let exchange = new ccxt.binance({});
  if (exchange.has['fetchTicker']) {
    await exchange.loadMarkets();
    const currencies = await Object.values(exchange.currencies).map(currency => ({
      code: currency.code,
    }));
    curFunction(currencies);
    console.log(currencies);
  }
}
function App() {
  const [currencies, setCurrencies] = useState();
  
  useEffect(() => {
    if (!currencies) {
      getCurrencies(setCurrencies);
    }
  }, [currencies])


  return (
    <>
      <div>Cryptocurrency price finder
        <SearchBar array={currencies} />
      </div>
    </>
  )
}

export default App
