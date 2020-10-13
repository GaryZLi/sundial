const express = require('express');
const cors = require('cors');
const axios = require('axios');
const http = require('http')
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT;

let currentCalls = 0;
let currentQueue = 0;
let callList;

io.on('connection', () => {
    console.log('connected')
});

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    callList = req.body;

    dial();
    
    res.send('Commencing calls.');
});

app.post('/webhooks', (req, res) => {
    if (req.body.status === 'completed') {
        currentCalls -= 1;
        dial();
    }

    io.emit('update', req.body);

    res.status(200).send();
});

server.listen(PORT, () => console.log('Listening on port', PORT));

const dial = () => {
    if (currentCalls < 3 && currentQueue < callList.length) {
        currentCalls += 1;

        axios.post('http://localhost:4830/call', {
            phone: callList[currentQueue++],
            webhookURL : 'http://localhost:5900/webhooks',
        })
        .then()
        .catch(err => console.log(err));

        dial();
    }
};