import { AnyMxRecord } from "dns";

const express = require("express");
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const Configuracion = {
    server: "http://127.0.0.1",
    port: 8080
};

let connection = mysql.createConnection({
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10649380',
    port: 3306,
    password: '4YNzg8jAAW',
    database: 'sql10649380'
});

connection.connect(function (error: any) {
    if (error) {
        console.log("Conexión Fallida")
        return;
    }
    console.log('conexión exitosa')
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req: any, res: any) => { res.send("hola mundo"); });
app.get('/login', (req: any, res: any) => {
    const email = req.query.email;
    const password = req.query.password;
    connection.query("SELECT * FROM user.credentials where email=? and password=md5(?)"), [email, password], function (error: any, resultados: any, fields: any) {
        if (error) {
            throw (error);
        } else {
            res.send(resultados);
        }
    }
});
app.listen(Configuracion,()=>{
    console.log(`servidor escuchando ${Configuracion.server}:${Configuracion.port}`);
});