// // Create map with Leaflet.js(long, lat, zoom level)


let map = leaflet.map('map').setView([51.505, -0.09], 13);


// Load tiles onto map for map styles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

console.log(IpData)
