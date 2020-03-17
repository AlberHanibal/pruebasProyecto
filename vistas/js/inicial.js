let fs = require('fs');
let path = require('path');
let ruta = path.join(__dirname, '/listado.html');
fs.readFile(ruta, function (error, datos) {
    let container = document.getElementById("contenido");
    container.innerHTML = datos;
});