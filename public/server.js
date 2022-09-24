const request = require('request'); 
const express = require('express');
const router = express.Router();
const path = require('path');
const { response } = require('express');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });


const app = express();

app.use(express.static('./public'));

let ipData = {}

request.get(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.API_KEY}`,
    function (err, res, data) {
        if (!err && res.statusCode == 200) { // Successful response
        console.log(data); // Displays the response from the API
        ipData = data;
    } else {
        console.log(err);
        ipData = err;
    }
});

app.get('/', (req, res) => {
    res.sendFile('./index.html')
})

app.get('/ipData', (req, res) => {
    res.type('application/json');
    res.jsonp(ipData);
})


app.all('*', (req, res) => {
    res.status(404).send('Resource not found')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
})



