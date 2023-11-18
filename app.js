const express = require ("express");
const app = express();
const dotenv = require('dotenv')
const mysql= require("mysql");
const cors = require ("cors");
const bcryptjs = require('bcryptjs')
dotenv.config({path: './env/.env'})
const db = require('./database/db')
const jwt = require('jsonwebtoken');

app.use(cors( {origin: process.env.FRONTED_URL} ));
app.use(express.json());

app.post("/login", (req, res) => {
    const Correo = req.body.email;
    const pass = req.body.password;
    db.query('SELECT * FROM terapeutas WHERE correo = ?', [Correo], async (err, result) => {
        if(err){
            console.log(err);
        }else{
            if(! (await bcryptjs.compare(pass, result[0].pass))){
                res.send({})
            }else{
                const datosToken = {
                    correo: result[0].correo,
                    nombre: result[0].nombre,
                    rol: result[0].rol,
                };
                const token = jwt.sign(datosToken, process.env.JWTSecret, {expiresIn: "8h"});
                const Resultado = {
                    token,
                    correo: result[0].correo,
                    nombre: result[0].nombre,
                    app: result[0].app,
                    apm: result[0].apm,
                    rol: result[0].rol,
                    idinstitucion: result[0].idinstitucion,
                    isactive: result[0].isactive,
                };
                console.log(Resultado)
                res.send(Resultado);
            }
        }
    });
});

app.get("/user", (req, res) => {
    db.query('SELECT * FROM terapeutas',
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result[0]);
        }
    });
});

app.listen(process.env.PORT, ()=>{
    console.log('SERVER UP runnung in http://localhost:3003')
})