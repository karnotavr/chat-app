const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
let activeUsers = {};

io.on('connection', (socket) => {
    console.log(`User Connect: ${socket.id}`);

    socket.on('join_room', ({ room, userName }) => {
        socket.join(room);
        socket.userName = userName;
        socket.room = room;
        if (!activeUsers[room]) {
            activeUsers[room] = [];
        }
        activeUsers[room].push(userName);
        io.to(room).emit('active_users', activeUsers[room]);
    });

    socket.on('leave_room', (room) => {
        socket.leave(room);
        if (activeUsers[room]) {
            activeUsers[room] = activeUsers[room].filter(
                (name) => name !== socket.userName
            );
            io.to(room).emit('active_users', activeUsers[room]);
        }
        socket.room = null;
    });

    socket.on('disconnect', () => {
        if (socket.room && activeUsers[socket.room]) {
            activeUsers[socket.room] = activeUsers[socket.room].filter(
                (name) => name !== socket.userName
            );
            io.to(socket.room).emit('active_users', activeUsers[socket.room]);
        }
    });

    socket.on('change_user_name', (newUserName) => {
        const room = socket.room;
        if (room && activeUsers[room]) {
            activeUsers[room] = activeUsers[room].map((name) =>
                name === socket.userName ? newUserName : name
            );
            socket.userName = newUserName;
            io.to(room).emit('active_users', activeUsers[room]);
        }
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    });
});

server.listen(3001, () => console.log('SERVER IS RUNNING'));
