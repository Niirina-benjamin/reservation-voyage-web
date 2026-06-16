require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

require('./config/db');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Réservation Voyage'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});