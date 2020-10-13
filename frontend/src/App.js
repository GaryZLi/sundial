import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const ENDPOINT = "http://localhost:5900";

const callList = [
    '13018040009',
    '19842068287',
    '15512459377',
    '19362072765',
    '18582210308',
    '13018040009',
    '19842068287',
    '15512459377',
    '19362072765',
];

function App() {
    // returns an array of the phone numbers' statuses, initalized to idle 
    const [statuses, setStatuses] = useState(
        callList.map(() => 'idle')
    );

    // initiate the call button to be available, (called not commenced)
    const [callInitiated, setCallInitiated] = useState(false);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on("update", info => setStatuses(prev => {
            prev.splice(info.id - 1, 1, info.status);
            
            return [...prev];
        }));
    }, []);

    // set the state to true to disable the call button
    const handleCall = () => {
        setCallInitiated(true);

        axios.post(ENDPOINT, callList)
            .then()
            .catch(err => console.log(err));
    };

    return (
        <div>
            {callList.map((phone, id) => (
                <div
                    key={id}
                    style={{ display: 'flex' }}
                >
                    <div>
                        {phone}
                    </div>
                    <div style={{ marginLeft: 10 }}>
                        {statuses[id]}
                    </div>
                </div>
            ))}
            <button onClick={handleCall} disabled={false}>
                Call
            </button>
        </div>
    );
}

export default App;
