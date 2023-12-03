const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/finanzas-personales')); // Asegúrate de que el nombre del directorio coincida con el nombre de tu proyecto

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/finanzas-personales/index.html'));
});

app.listen(process.env.PORT || 8080);
