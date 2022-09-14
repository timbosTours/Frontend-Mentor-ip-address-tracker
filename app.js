const http = require('http')
const port = 3000

const server = http.createServer(function (req, res) {
    res.write('helloooo')
    res.end()
})

server.listen(port, function (error) {
    if (error) { 'whoops', error }
    else {
        console.log('server is listening on port' + port);
    }
}
)

// Create map with Leaflet.js(long, lat, zoom level)
var map = L.map('map').setView([51.505, -0.09], 13);


// Load tiles onto map for map styles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
