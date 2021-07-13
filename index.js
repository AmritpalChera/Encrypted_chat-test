const express = require('express')
const router = express.Router();
const app = express();
const socket = require('socket.io')
const users = require('./server/users')
const bodyParser = require('body-parser');



require('./server/startup/cors')(app)

app.use(bodyParser.urlencoded({ extended: true }))

// const color = require('colors')
const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

router.post('/api/testCall', (req, res) => {
    console.log(req.body)
    console.log('Hello')
    res.send('hi there!')
})

app.use(router)

const port = process.env.PORT || 8000;

let server = app.listen(port, () => {
    console.log(
        `Server is running on port ${port}`
    )
})

//connect socket
// require('./server/socket')(server)

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: [
            "Access-Control-Allow-Origin",
            "http://localhost:3000",
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, X-Requested-With, Content-Type, Accept",
            'Access-Control-Allow-Credentials'
        ]
      }
});
// console.log('connected to IO')
//handles everything related to io 
io.on('connection', (socket) => {
    console.log('connection estatablished')
    //for when a new user joins the room
    socket.on('joinRoom', ({ username, roomname }) => {
        console.log('new user joined')
        //create the user
        const user = users.userJoin(socket.id, username, roomname);
        console.log("ID>>", socket.id)
        socket.join(user.room);

        //emitting welcome message to the user
        socket.emit('message', {
            userId: user.id,
            username: user.username,
            text: `Welcome ${user.username}`
        })


        //Broadcast message to everyone except user that user joined
        socket.broadcast.to(user.room).emit('message', {
            userId: user.id,
            username: user.username,
            text: `${user.username} has joined the chat`
        })
    })


    //socket for text messages
    socket.on('chat', (text) => {
        console.log(text)
        const user = users.getCurrentUser(socket.id)

        io.to(user.room).emit('message', {
            userId: user.id,
            username: user.username,
            text: text
        })
    })


    //when the user disconnects
    socket.on('disconnect', () => {
        const user = users.userLeave(socket.id)

        if (user) {
            io.to(user.room).emit('message', {
                userId: user.id,
                username: user.username,
                text: `${user.username} has left the chat`
            })
        }
    })

    
    
})

