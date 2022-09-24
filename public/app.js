

async function getIpData() {
    // fetch data from node server
    const response = await fetch('http://localhost:5000/ipData');
    const data = await response.json();
    // convert json string into object
    var ipData = JSON.parse(data)
    console.log(ipData);
};

getIpData();

// // Create map with Leaflet.js(long, lat, zoom level)


let map = leaflet.map('map').setView([51.505, -0.09], 13);


// Load tiles onto map for map styles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
