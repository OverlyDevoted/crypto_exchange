// server/index.js
//enabling environment variables 
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.MONGODB_URI) {
    console.error("Could not find MongoDB deployment URI. Closing server...")
    return;
}
const dbHandler = require("./db.js");
const db = new dbHandler(process.env.MONGODB_URI);

const express = require("express");
//Backend server code, api 
const PORT = process.env.PORT || 3001;

const app = express();
app.post('/api', async (req, res) =>  {
    const cryptocurrency = req.query.value; 
    const user = req.query.user;
    const action = req.query.action;
    //remove when proxy is setup
    res.header('Access-Control-Allow-Origin','*');
    if (!cryptocurrency || !user || !action) {
        console.log("No parameter \'value\', \'user\' or \'action\' was provided");
        res.json({ message: `No parameter \'value\', \'user\' or \'action\'was provided`, response: 502 });
        return;
    }
    console.log(`User ${user} ${action}ed for: ${cryptocurrency}`);
    await db.insertSearch("cryptoExchange", action, {cryptocurrency: cryptocurrency, user: user});
    console.log("Finished handling request in the DB. Sending response");
    res.json({ message: `User ${user} successfully inserted ${action} value: ${cryptocurrency}`, response: 200 });
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
