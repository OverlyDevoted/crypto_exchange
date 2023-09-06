# Repository and documentation for Crypto Exchange system 

## About this
Hello! The purpose of this file is to provide a project overview, setup instructions and list out some details about the project. 

This is a task project for JavaScript Application Developer internship at IBM. During the time of doing this homework assignment a software system was created for looking up cryptocurrency prices. Main features include:
 - Cryptocurrency symbol search;
 - Integrated CCXT library for most recent cryptocurrency market data;
 - Cryptocurrency price data range selection;
 - Rendering cryptocurrency price data through a candlestick graph;
 - User action observation and saving into MongoDB.

The project was created by Robert Dulko.
~~[Project Web URL](https://github.com/OverlyDevoted/crypto_exchange)~~

## Running on localhost
**Prerequisites**

You will need Nodejs and npm installed in your system in order to run both the back-end and the front-end. A MongoDB cluster is also needed to run the back-end. 

**Back-end** 

 1. Clone project repository
 2. Through the terminal go to `/crypto_back` and type `npm i`  
 3. Create .env file and fill it with port 3000 for the server and MongoDB connection URI
 4. To run the back-end server `npm start`

**Front-end**

 1. Go to `/crypto_front` folder and run `npm i` in the terminal
 2. Run the server by typing `npm run dev`
 3. In the browser go to `localhost:5137`

With the front-end and the back-end running it's now possible to use the system.

## Technical overview
The front-end web page was created with React. 
The back-end was developed using Node.js JavaScript runtime and Express for building RESTful APIs. Back-end has MongoDB integration. If the server is launched without MongoDB URI the requests will be handled without making calls to MongoDB. 

## Additional notes
Not all features were fully implemented. Most notable features that need additional polishing and improvement:

 - Cryptocurrency data processing: the data for cryptocurrency prices
   are being filtered accordingly for any given data range. CCXT
   provides price data in intervals instead of time-frames. To fix the
   feature the received data has to be sorted by the actual time range,
   so data points that date behind the time range have to be excluded
   from the data array
 
 - Front-end vite build errors. Some Node.js modules imported from the
   CCXT library don't get built for the front-end application. Bandage
   solution would be to move the CCXT library to the existing back-end
   or build another back-end solely for handling cryptocurrency data.
   This would increase the latency for data requests, but would fix the
   front-end build errors. A more suitable solution would be to figure
   out how to polyfill the problematic Node.js modules.
   
 - Proper database connection handling. Currently database object created for
   handling database logic inside the back-end server is validated against the URI provided in the `.env` file. Currently, even with an invalid database URI, the server system will attempt to call the database functions, potentially leading to a server crash. To address this issue, error callback functions should be implemented within the database functions. These callback functions would allow to add functions that would handle cases when the database is not instantiated or cannot be reached at the moment of calling the database."
 - Candlestick graph height does not get properly resized when resizing
   the window. Full  component re-rendering should be done when changing
   window height.