const express = require('express');
const cors = require('cors');
require('dotenv').config();

const avisosRoutes = require('./routes/avisos');
const empresasRoutes = require('./routes/empresas');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Avisos de Empleo funcionando 🚀');
});

app.use('/avisos', avisosRoutes);
app.use('/empresas', empresasRoutes);

/* LOCAL ROUTES
app.use('/api/avisos', avisosRoutes);
app.use('/api/empresas', empresasRoutes);
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
