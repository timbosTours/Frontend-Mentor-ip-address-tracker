var axios = require('axios')

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const api = 'https://geo.ipify.org/api/v2/country?'
const apiKey = process.env.API_KEY;

exports.DisplayData = function (req, res) {
    var url = `${api}apiKey=${apiKey}`;
    axios.get(url).then(response => {
        let ip = response.id
        res.render('index.pug', { ip })
    }
)}        