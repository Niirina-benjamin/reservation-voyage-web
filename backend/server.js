require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

require('./config/db');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
    res.json({
        message: 'API Réservation Voyage'
    });
});

// Route protégée
const authMiddleware = require('./middleware/authMiddleware');

app.get('/api/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'Accès autorisé',
        user: req.user
    });
});

const dashboardRoutes =
require("./routes/dashboardRoutes");

app.use(
    "/api/dashboard",
    dashboardRoutes
);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
