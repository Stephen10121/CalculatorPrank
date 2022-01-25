const http = require("http");
const express = require('express');
const socketio = require('socket.io');
const PORT = 5400;
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "https://drive.gruzservices.com");
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.set('view engine', 'ejs');
app.use(express.json(), express.static('public'), express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST']
  }
});

app.get('/', (req, res) => res.render('index'));
app.get('/source', (req, res) => res.render('source'));

io.on('connection', socket => {
    socket.on("data", (data) => {
        io.emit("adminData", data);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));