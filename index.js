const exress = require('express')
const app = exress()
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')
const not = require('dotenv').config()
const port = process.env.port
const corsOpetion = {
    origin: 'http://localhost:3000',
}
app.use(exress.urlencoded({ extended: true }))
app.use(exress.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("hello word")
})

const server = http.createServer(app)
const io = new Server(server, {
    cors: corsOpetion
})

io.on("connection", (socket) => {
    socket.on('join', (data) => {
        socket.emit('joined', { ...data, email: `${data.name}@gmail.com` })
    })
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
