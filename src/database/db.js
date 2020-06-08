//importar dependencia do sqlite3
const sqlite3 = require("sqlite3");
sqlite3.verbose();

//iniciar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

//utilizar o objeto de banco de dados para operações
db.serialize(
    () => {
        //Criar uma tabela
        db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
        `)

        //Inserir dados na tabela
        const query = `
        INSERT INTO places (image,name,address,address2,state,city,items) 
        VALUES (?,?,?,?,?,?,?);
        `;

        const values = [
            "https://images.unsplash.com/photo-1507560461415-997cd00bfd45?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
            "Colectoria",
            "Guilherme Gemballa, Jardim América",
            "Nº 260",
            "Santa Cararina",
            "Rio do Sul",
            "Residuos Eletrônicos, Lâmpadas"
        ];

        function afterInsertData(err) {
            if (err) {
                return console.log(err)
            }

            console.log("Cadastrado com sucesso")
            console.log(this);
        }

        db.run(query, values, afterInsertData);

        //Consultar os dados
        db.all(`SELECT * from places`, function (err, rows) {
            if (err) {
                return console.log(err)
            }
            console.log("Aqui estão seus registros");
            console.log(rows);
        })


        //Deletar dado da tabela
        // db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
        //     if (err) {
        //         return console.log(err)
        //     }
        //     console.log("Registro Deletado com Sucesso");
        // });
    }
)