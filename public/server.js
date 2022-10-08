// load and configure packages
const request = require('request'); 
const express = require('express');
const path = require('path');
const axios = require('axios');
const { json, response } = require('express');
const { AsyncLocalStorage, executionAsyncResource } = require('async_hooks');
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const api = 'https://geo.ipify.org/api/v2/country?'
const apiKey = process.env.API_KEY;
const context = new AsyncLocalStorage;
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

// const searchIp = () => {
//     const ip = context.getStore().get('ip')

//     if (ip !== undefined) {
//         fetch(`${api}apiKey=${apiKey}&ipAddress=${ip}`)
//             .then(response => console.log(response))
//             .catch(error => {
//             console.log('couldnt search ip');
//             })
//     } else {
//         fetch(`${api}apiKey=${apiKey}`)
//         .then(res => res.json)
//             // .then(data => console.log(data))
//             .catch(error => {
//                 console.log('couldnt find ip');
//             })
//     }
// }


// get data from api
// request.get(`${api}apiKey=${apiKey}`,
//     function (err, res, data) {
//         // check for response or error
//         if (!err && res.statusCode == 200) { // Successful response
//         console.log(data); // Displays the response from the API
//             ipData = data;
//     } else {
//         console.log(err);
//         ipData = err;
//     }
// });

// lets try axios
axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_8GE1HPonrAAGY0ggGjL3YAuoxACZ1')
	.then((res) => { console.log(res.data) })
	

// get root
app.get('/', (req, res) => {
    res.sendFile('./index.html');
});


// app.post('/', (req, res, next) => {
//     let ip = req.body.ip
//     const store = new Map()
    
//     store.set('ip', ip)
    
//     context.run(store, () => {
//         searchIp()
//     })
//     next()
// })
// get ip data for client
// app.get('/ipData', (req, res) => {
//     res.type('application/json');
//     res.jsonp(ipData);
// });

app.all('*', (req, res) => {
    res.status(404).send('Resource not found')
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});