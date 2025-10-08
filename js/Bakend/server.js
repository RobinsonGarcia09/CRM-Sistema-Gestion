// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB (CRM)'))
.catch(err => console.error('Error al conectar MongoDB:', err));

const clienteRoutes = require('./routes/clientes');
app.use('/api/clientes', clienteRoutes);

const proveedorRoutes = require('./routes/Proveedor');
app.use('/api/proveedores', proveedorRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor backend en http://localhost:${PORT}`));