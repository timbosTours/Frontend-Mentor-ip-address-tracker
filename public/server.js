// load and configure packages
const request = require('request'); 
const express = require('express');
const path = require('path');
const axios = require('axios');
const { json, response } = require('express');
const { AsyncLocalStorage, executionAsyncResource } = require('async_hooks');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const api = 'https://geo.ipify.org/api/v2/country?'
const apiKey = process.env.API_KEY;
const context = new AsyncLocalStorage;

// initiate app
const app = express();
app.set('view engine', 'pug');

// serve static files(html, css, app.js, images etc...)
app.use(express.static('./public'));

// parse form data
app.use(express.urlencoded({ extended: false }));


let searchIp = () => {
	const ip = context.getStore().get('ip')

	if (ip !== undefined) {
		axios.get(`${api}apiKey=${apiKey}&ipAddress=${ip}`)
			.then((res) => {
				let ipDataArray = [];
				[res.data].map((ipData) => {
					ipDataArray.push(ipData)
					console.log(ipDataArray)
				})
				res.render("ipData", {
					ipData: ipDataArray
				})
			})
			.catch((error) => {
						console.log(error)
					})
	} else {
		axios.get(`${api}apiKey=${apiKey}`)
			.then((res) => {
				let ipDataArray = [];
				[res.data].map((ipData) => {
					ipDataArray.push(ipData)
					console.log(ipDataArray)
				})
				res.render("ipData", {
					ipData: ipDataArray
				})
			})
			.catch((error) => {
						console.log(error)
					})
	}
};

// axios.get(`${api}apiKey=${apiKey}`)
// 			.then((_res) => {
// 				let ipDataArray = [];
// 				[_res.data].map((ipData) => {
// 					ipDataArray.push(ipData)
// 					console.log(ipDataArray)
// 				})
// 				// _res.render("ipData", {
// 				// 	ipData: ipDataArray
// 				// })
// 			})
// 			.catch((error) => {
// 						console.log(error)
// 					})

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

// get root
app.get('/', searchIp, (req, _res) => {
	_res.sendFile('./index.html');
	next()
});


app.post('/search', (req, res, next) => {
    let ip = req.body.ip
    const store = new Map()
    
    store.set('ip', ip)
    
    context.run(store, () => {
		searchIp(ip)
	})
	next()
})
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