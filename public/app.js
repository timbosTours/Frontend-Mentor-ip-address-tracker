const express = require('express');
const path = require('path');
const leaflet = ('leaflet');


const app = express();

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


// // Create map with Leaflet.js(long, lat, zoom level)


// let map = leaflet.map('map').setView([51.505, -0.09], 13);


// // Load tiles onto map for map styles
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map);
