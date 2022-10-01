// load and configure packages
const request = require('request'); 
const express = require('express');
const router = express.Router();
const path = require('path');
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const { response, urlencoded, application, json } = require('express');
const { nextTick } = require('process');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const api = 'https://geo.ipify.org/api/v2/country,city?'
const apiKey = process.env.API_KEY;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
		'X-RapidAPI-Key': 'your-rapidapi-key'
	}
};


// initiate app
const app = express();

// serve static files(html, css, app.js, images etc...)
app.use(express.static('./public'));

// parse form data
app.use(express.urlencoded({ extended: false }));

// use post to recieve ip search data from form

// app.post('/search', (req, res) => {
//     res.type('application/json')
//     let searchIp = req.body.ip
//     res.send(searchIp)
// })

// create empty array to store data from API
// let ipData = fetch(`${api}apiKey=${apiKey}`, options)
//     .then(res => res.json())
//     .then(data => console.log(data))
// 		.catch(err => console.error('error:' + err)); 

// get data from api
request.get(`${api}apiKey=${apiKey}`,
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
app.get('/', (req, res, next) => {
    // res.sendFile('./index.html')
    console.log(req.query.ip)
    
    try {
        request.get(`${api}apiKey=${apiKey}&ipAddress=${ip}`,
    function (err, res, data) {
        // check for response or error
        if (!err && res.statusCode == 200) { // Successful response
        console.log(data); // Displays the response from the API
            searchData = data;
    } else {
        console.log(err);
        searchData = err;
    }
})
    } catch (e){
        console.log(e);
        console.log('error!');
    }
    next()
})


// get ip data for client
app.get('/ipData', (req, res) => {
    res.type('application/json')
    res.jsonp(ipData);
})
app.get('/searchData', (req, res) => {
    res.type('application/json')
    res.jsonp(searchData);
})


app.all('*', (req, res) => {
    res.status(404).send('Resource not found')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
})



