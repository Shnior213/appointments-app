require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const managerRoutes = require('./routes/managers');
const hoursRoutes = require('./routes/workHours');
const appointmentRoutes = require('./routes/appointments');

console.log('🟢 server.js loaded');

const app = express();

app.get('/ping', (req, res) => res.send('pong'));


app.use((req, res, next) => {
    console.log('➡️', req.method, req.originalUrl);
    next();
});

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/work-hours', hoursRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
