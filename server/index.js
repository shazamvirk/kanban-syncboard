require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

const boardRoutes = require('./routes/boardRoutes');
const registerSocketHandlers = require('./socket/boardHandlers');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.use('/api/board', boardRoutes);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

registerSocketHandlers(io);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kanban_db';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Kanban Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });