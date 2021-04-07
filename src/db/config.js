const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Toda vez que chamar esse arquivo config, estamos iniciando a conexão com o db
module.exports = () => {
        // abrindo conexão com o banco de dados
        open({
                // qual vai ser o arquivo que o banco vai guardar as informações?
                filename: "./database.sqlite",
                driver: sqlite3.Database
        });
};
