// server/index.js
//enabling environment variables 
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
//more sophisticated URI check need for checking db integration
if (!process.env.MONGODB_URI) {
    console.error("Could not find MongoDB deployment URI. Closing server...");
}
const dbHandler = require("./db.js");
const db = new dbHandler(process.env.MONGODB_URI);

const express = require("express");
const app = express();
//Backend server code, api 
const PORT = process.env.PORT || 3001;

app.post('/api', async (req, res) => {
    const cryptocurrency = req.query.value;
    const user = req.query.user;
    const action = req.query.action;
    //remove when proxy is setup
    console.log(`User ${user} ${action}ed for: ${cryptocurrency}`);
    res.header('Access-Control-Allow-Origin', '*');
    if (!cryptocurrency || !user || !action) {
        console.log("No parameter \'value\', \'user\' or \'action\' was provided");
        res.status(502);
        res.json({ message: `No parameter \'value\', \'user\' or \'action\'was provided` });
        return;
    }
    if (!db.uri) {
        res.json({ message: `Only logged without saving to database` });
        return;
    }
    await db.insertSearch("cryptoExchange", action, { cryptocurrency: cryptocurrency, user: user });
    console.log("Finished handling request in the DB. Sending response");
    res.json({ message: `User ${user} successfully inserted ${action} value: ${cryptocurrency}` });
})

app.use(express.static(path.join(__dirname, '..', '..', 'crypto_front', 'dist')));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
