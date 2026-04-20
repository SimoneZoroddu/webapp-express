const mysql = require('mysql2');
require('dotenv').config()

const credentials = {
    host: process.env.DB_HOST || "my_host",
    user: process.env.DB_USER || "my_user",
    password: process.env.DB_PASSWORD || "my_password",
    database: process.env.DB_NAME || "my_database_name"
}

const connection = mysql.createConnection(credentials)

connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connesso al database MySQL');
});


module.exports = connection