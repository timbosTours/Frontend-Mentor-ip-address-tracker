const e = require("express");

async function getIpData() {
    // fetch data from node server
    const response = await fetch('http://localhost:5000/ipData');
    const data = await response.json();
    // convert json string into object
    var ipData = JSON.parse(data)
    console.log(ipData)
    
    // grab ip address
    const ipAddress = ipData.ip;
    console.log(ipAddress)
    
    // append ip address, timezone, location and isp with document fragment
    const ipLi = document.getElementById('li-ipAddress');
    const docFrag1 = document.createDocumentFragment();
    let ipFrag1 = document.createElement('p');
    ipFrag1.textContent = ipAddress;
    docFrag1.appendChild(ipFrag1);
    
    ipLi.appendChild(docFrag1)
    
    const location = ipData.location.region;
    console.log(location)
    
    const locationLi = document.getElementById('li-location');
    const docFrag2 = document.createDocumentFragment();
    let ipFrag2 = document.createElement('p');
    ipFrag2.textContent = location;
    docFrag2.appendChild(ipFrag2);
    
    locationLi.appendChild(docFrag2)
    
    const timezone = ipData.location.timezone;
    console.log(timezone)
    
    const timezoneLi = document.getElementById('li-timezone');
    const docFrag3 = document.createDocumentFragment();
    let ipFrag3 = document.createElement('p');
    ipFrag3.textContent = timezone;
    docFrag3.appendChild(ipFrag3);
    
    timezoneLi.appendChild(docFrag3)
    
    const isp = ipData.isp;
    console.log(isp)
    
    const ispLi = document.getElementById('li-isp');
    const docFrag4 = document.createDocumentFragment();
    let ipFrag4 = document.createElement('p');
    ipFrag4.textContent = isp;
    docFrag4.appendChild(ipFrag4);
    
    ispLi.appendChild(docFrag4);
};

getIpData();
let btn = document.getElementById('submit-ip-button')

btn.addEventListener('submit', console.log('you submitted'));


// function handleForm(ev) {
//     ev.preventDefault();
//     let myForm = ev.target;
//     let fd = new FormData(myForm)
//     console.log(fd)
// }

// // Create map with Leaflet.js(long, lat, zoom level)

async function loadMap(){
    // fetch data from node server
    const response = await fetch('http://localhost:5000/ipData');
    const data = await response.json();
    // convert json string into object
    var ipData = JSON.parse(data)
    console.log(ipData)

    let lat = ipData.location.lat;
    let long = ipData.location.lng;


    let map = leaflet.map('map').setView([lat, long], 13);


// Load tiles onto map for map styles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map);
}

loadMap();