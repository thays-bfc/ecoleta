const express = require("express");
const server = express();

//Iniciar banco de dados
const db = require("./database/db");

//configurar pasta publica
server.use(express.static("public"));

//Habilitar o uso do req.body na aplicaçao
server.use(express.urlencoded({ extended: true }));

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

//Inserir dados
server.post("/savepoint", (req, res) => {
    //Inserir dados na tabela
    const query = `
                INSERT INTO places (image,name,address,address2,state,city,items) 
                VALUES (?,?,?,?,?,?,?);
                `;

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!");
        }

        console.log("Cadastrado com sucesso");
        console.log(this);
        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData);
});

//Busca dados do banco de dados
server.get("/search-results", (req, res) => {
    //Consultar os dados
    db.all(`SELECT * from places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length;

        return res.render("search-results.html", { places: rows, total: total })
    })
});

server.listen(3000);