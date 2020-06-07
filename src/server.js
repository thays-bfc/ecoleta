const express = require("express");
const server = express();

//configurar pasta publica
server.use(express.static("public"));

//Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

//Configurar caminhos da minha aplicação
//pagina inicial
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Seu Marketplace de coleta de resíduos" })
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
});
server.get("/search-results", (req, res) => {
    return res.render("search-results.html")
});

server.listen(3000);