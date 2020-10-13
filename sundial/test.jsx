const axios = require('axios')

axios.post('http://localhost:4830/call', {
    phone: '18582210308',
})
.then(res => console.log(res.data))
.catch(err => console.log(err))

// axios.get('http://localhost:4830')
// .then(res => console.log(res))
// .catch(err => console.log(err))