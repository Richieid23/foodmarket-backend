const express = require('express');
const cors = require('cors');
const menuRoutes = require('./src/routes/menu');
const authRoutes = require('./src/routes/auth');
const orderRoutes = require('./src/routes/order');

const app = express();
const port = 5000;

// midleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
})