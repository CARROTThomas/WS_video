const http = require('http');
const socketIo = require('socket.io');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    transports: ['websocket', 'polling'],
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`Client connecté : ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Client déconnecté : ${socket.id}`);
    });
});

app.post('/send', (req, res) => {
    io.emit('notification', { message: 'Nouvelle notification !' });
    res.status(200).json({ success: true, message: 'Notification envoyée à tous les clients.' });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
