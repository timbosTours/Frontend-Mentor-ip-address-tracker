// load and configure packages
const request = require('request'); 
const express = require('express');
const path = require('path');
const { json, response } = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

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

// get data from api
request.get(`${api}apiKey=${apiKey}`,
    function (err, res, data) {
        // check for response or error
        if (!err && res.statusCode == 200) { // Successful response
        // console.log(data); // Displays the response from the API
            ipData = data;
    } else {
        console.log(err);
        ipData = err;
    }
});

// get root
app.get('/', (req, res) => {
    res.sendFile('./index.html');
});

// get ip data for client
app.get('/ipData', (req, res) => {
    res.type('application/json');
    res.jsonp(ipData);
});

app.post('/', (req, res, next) => {
    console.log(req.body)
    
    // put function in here???
    // async function searchIp(ip) {
    //     let searchData = await fetch(`${api}apiKey=${apiKey}&ipAddress=${ip}`)
    //         .then(res => res.json)
    //         .then(json => {
    //         return json
    //     })
    //     res.send(JSON.stringify(json))
    // }
    // searchIp()
    // next()
})
app.all('*', (req, res) => {
    res.status(404).send('Resource not found')
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});