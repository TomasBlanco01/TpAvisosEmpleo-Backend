const express = require('express');
const cors = require('cors');
require('dotenv').config();

const anunciosRoutes = require('./routes/anuncios');
const empresasRoutes = require('./routes/empresas');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/anuncios', anunciosRoutes);
app.use('/api/empresas', empresasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
