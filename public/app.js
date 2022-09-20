// require('dotenv').config();

// console.log(process.env);

// async function getIp() {
//     try {
//         const data = await get(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.API_KEY}&ipAddress=8.8.8.8`)
//     }
//     catch { }
// }


// // Create map with Leaflet.js(long, lat, zoom level)


let map = leaflet.map('map').setView([51.505, -0.09], 13);


// Load tiles onto map for map styles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);