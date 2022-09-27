// load and configure packages
const request = require('request'); 
const express = require('express');
const router = express.Router();
const path = require('path');
const { response, urlencoded } = require('express');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

// initiate app
const app = express();

// serev static files(html, css, app.js, images etc...)
app.use(express.static('./public'));

// parse form data
app.use(express.urlencoded({ extended: false }))
app.get('/search', (req, res) => {
    res.status(200).json({success: true})
})

// create empty array to store data from API
let ipData = {}



// get data from api
request.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}`,
    function (err, res, data) {
        // check for response or error
        if (!err && res.statusCode == 200) { // Successful response
        console.log(data); // Displays the response from the API
            ipData = data;
    } else {
        console.log(err);
        ipData = err;
    }
});

// get root
app.get('/', (req, res) => {
    res.sendFile('./index.html')
})

// use post to recieve ip search data from form
app.post('/search', (req, res) => {
    console.log(req.body)
    res.send('post')
})

// get ip data for client
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



