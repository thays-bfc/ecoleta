const express = require("express");
const server = express();

//Configurar caminhos da minha aplicação
//pagina inicial
server.get("/", () => {

});

server.listen(3000);