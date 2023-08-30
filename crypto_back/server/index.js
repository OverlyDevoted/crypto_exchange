// server/index.js
//enabling environment variables 
const dotenv = require('dotenv');
dotenv.config();

if(!process.env.MONGODB_URI)
{
    console.error("Could not find MongoDB deployment URI. Closing server...")
    return;
}
const dbHandler = require("./db.js");
const db = new dbHandler(process.env.MONGODB_URI);
db.connect();



const express = require("express");
//Backend server code, api 
const PORT = process.env.PORT || 3001;

const app = express();
app.get('/api', (req, res) => {
    console.log("User searched for: " + req.query.search);
    // res.json({ message: "Hello from server!" });
})
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});