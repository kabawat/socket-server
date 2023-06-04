const exress = require('express')
const app = exress()
const http = require('http')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./router')
const path = require('path')
const not = require('dotenv').config()
const port = process.env.port || 2917
app.use(exress.urlencoded({ extended: true }))
app.use(exress.json())
app.use(cors(
    {
        origin: 'https://socket-client.onrender.com/'
    }
))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://socket-client.onrender.com/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(fileUpload())
app.get('/', (req, res) => {
    res.send("hello word")
})
app.use('/', exress.static(path.join(__dirname, 'public/')))
app.use(router)
const server = http.createServer(app)
server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
