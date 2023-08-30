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
app.get('/api/search', (req, res) => {
    const cryptocurrency = req.query.value; 
    const user = req.query.user;
    if (!cryptocurrency || !user) {
        console.log("No parameter \'value\' or \'user\' was provided");
        res.json({ message: `No parameter \'value\' or \'user\' was provided`, response: 502 });
        return;
    }
    console.log(`User ${user} searched for: ${cryptocurrency}`);
    db.insertSearch("cryptoExchange", "search", {cryptocurrency: cryptocurrency, user: user});

    res.json({ message: `User ${user} successfully inserted search value: ${cryptocurrency}`, response: 200 });
})

app.get('/api/find', (req, res) => {
    const cryptocurrency = req.query.value;
    const user = req.query.user;
    if (!cryptocurrency || !user) {
        console.log("No parameter \'value\' or \'user\' was provided");
        res.json({ message: `No parameter \'value\' or \'user\' was provided`, response: 502 });
        return;
    }
    db.find("cryptoExchange", "search", { cryptocurrency: cryptocurrency, user: user });
    console.log("finding");
    res.json({ message: "finding" });
})
/* 
app.get('/api/select', (req, res) => {
    const search = req.query.value;
    const user = req.query.user;
    if (!search || !user)
    {
        console.log("No parameter \'search\' was provided");
        res.json({ message: `Server could not resolve the request`, response: 502 });
        return;
    }
    
    console.log("User searched for: " + search);
    db.insertSingle("cryptoExchange", user, { selection: search, date: Date() });
    res.json({ message: `Successfully inserted search value: ${search}`, response: 200 });
}) */

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
