// load and configure packages
const request = require('request'); 
const express = require('express');
const path = require('path');
const axios = require('axios');
const { json, response } = require('express');
const { AsyncLocalStorage, executionAsyncResource } = require('async_hooks');
const { dirname } = require('path');

// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

// const api = 'https://geo.ipify.org/api/v2/country?'
// const apiKey = process.env.API_KEY;
const context = new AsyncLocalStorage;

// initiate app
const app = express();
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'pug');

// serve static files(html, css, app.js, images etc...)
app.use(express.static('./public'));

// parse form data
app.use(express.urlencoded({ extended: false }));


// let searchIp = () => {
// 	const ip = context.getStore().get('ip')

// 	if (ip !== undefined) {
// 		axios.get(`${api}apiKey=${apiKey}&ipAddress=${ip}`)
// 			.then((res) => {
// 				let ipDataArray = [];
// 				[res.data].map((ipData) => {
// 					ipDataArray.push(ipData)
// 					console.log(ipDataArray)
// 				})
// 				res.render('index', {
// 					ip: ipDataArray.ip,
// 					region: ipDataArray.location.region,
// 					timezone: ipDataArray.location.timezone,
// 					isp: ipDataArray.isp
// 				})
				
// 			})
// 			.catch((error) => {
// 						console.log(error)
// 					})
// 	} else {
// 		axios.get(`${api}apiKey=${apiKey}`)
// 			.then((res) => {
// 				let ipDataArray = [];
// 				[res.data].map((ipData) => {
// 					ipDataArray.push(ipData)
// 					console.log(ipDataArray)
// 				})
// 				res.render('index.pug', {
// 					ip: ipDataArray.ip,
// 					region: ipDataArray.location.region,
// 					timezone: ipDataArray.location.timezone,
// 					isp: ipDataArray.isp
// 				})
// 			})
// 			.catch((error) => {
// 						console.log(error)
// 					})
// 	}
// };



// TRY?? adding to array then render array in pug https://www.youtube.com/watch?v=Ad2ngx6CT0M&t=425s 



// axios.get(`${api}apiKey=${apiKey}`)
// 	.then(async (res) => {
// 		await res.render('index.pug', {
// 				ip: ipData,
// 			})
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 		})

// axios.get(`${api}apiKey=${apiKey}&ipAddress=${ip}`)
// 			.then((res) => {
// 				let ipDataArray = [];
// 				[res.data].map((ipData) => {
// 					ipDataArray.push(ipData)
// 				})
// 				res.render('index', {
// 					ip: ipDataArray,
// 				})
// get root

app.post('/', (req, res, next) => {
	let ip = req.body.ip
    const store = new Map()
    
    store.set('ip', ip)
    
    context.run(store, () => {
		searchIp(ip)
	})
	searchIp()
	return next()
})


app.all('*', (req, res) => {
    res.status(404).send('Resource not found')
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});