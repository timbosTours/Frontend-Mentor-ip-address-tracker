const request = require('request'); 
const express = require('express');
const path = require('path');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });


const app = express();

let ipData = request.get(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.API_KEY}`, function(err, res, data) {
    if(!err && res.statusCode == 200) { // Successful response
        console.log(data); // Displays the response from the API
        ipData = data;
        console.log(ipData.domains);
    } else {
        console.log(err);
        ipData = err;
    }
});

app.get("/ipdata", (req, res) => {
    res.jsonp(ipData);
});

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('./index.html')
})


app.all('*', (req, res) => {
    res.status(404).send('Resource not found')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
})



