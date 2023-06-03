const exress = require('express')
const app = exress()
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./router')
const not = require('dotenv').config()
const port = process.env.port || 2917
const corsOpetion = {
    origin: ['http://localhost:3000', 'https://socket-client.onrender.com'],
}
app.use(exress.urlencoded({ extended: true }))
app.use(exress.json())
app.use(cors(
    {
        origin: 'https://socket-client.onrender.com'
    }
))
app.use(fileUpload())
app.get('/', (req, res) => {
    res.send("hello word")
})
app.use(router)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://socket-client.onrender.com']
    }
})

io.on("connection", (socket) => {
    console.log(socket.id)
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
