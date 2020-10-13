const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    axios.post('http://localhost:4830/call', {
        phone: '18582210308',
        webhookURL : 'http://localhost:5900',
    })
    .then(res => console.log(res))
    console.log(req.body)

    res.send()
});

app.post('/webhooks', (req, res) => {
    // axios.post('http://localhost:4830/call', {
    //     phone: '18582210308',
    //     webhookURL : 'http://localhost:5900',
    // })
    // .then(res => console.log(res))
    console.log(req.body)

    res.send()
});

app.listen(PORT, () => console.log('Listening on port', PORT));