require('./../config/config')
const path = require('path');
const http = require('http');
const express = require("express");
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT;

const message = require('./utils/message')

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected')
    


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are requiered.')
        }

        socket.join(params.room);
        //for leave  room: socket.leave(ROOM NAME);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))

        //io.emit -> send message to all users.
        //socket.broadcast.emit -> send message to all user except the current user.
        //socket.emit -> send message only for the current user
        //io.to('ROOM NAME').emit -> for specific "room" (by join).

        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app!'))

        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`))

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('Message created on server: ',message);
         io.emit('newMessage', generateMessage(message.from, message.text))
         callback();
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })
    
    socket.on('disconnect', () =>{
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))

        }

    });

});




server.listen(port, () => {
    console.log(`Started up at port ${port}`);
})


