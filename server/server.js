require('./../config/config')
const path = require('path');
const http = require('http');
const express = require("express");
const socketIO = require('socket.io');

const publicPath = path.join(__dirname , '../public')
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected')
    
    socket.emit('newMessage', {
        from:'Admin',
        text: 'Welcome to the chat app!'
    })

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'new user joind!',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (message) => {
        console.log('Message created on server: ',message);
         message.createAt = new Date().getTime();
         io.emit('newMessage', message)
        // socket.broadcast.emit('newMessage', message)

    })
    
    socket.on('disconnect', () =>{
        console.log('User Disconnected!')
    });

});




server.listen(port, () => {
    console.log(`Started up at port ${port}`);
})


