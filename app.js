const express = require ("express");
const app = express();
const dotenv = require('dotenv')
const mysql= require("mysql");
const cors = require ("cors");
dotenv.config({path: './env/.env'})
const db = require('./database/db')
app.use(cors( {origin: process.env.FRONTED_URL} ));
app.use(express.json());

app.post("/login", (req, res) => {
    const Correo = req.body.email;
    db.query('SELECT * FROM terapeutas WHERE correo = ?', [Correo],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(process.env.PORT, ()=>{
    console.log('SERVER UP runnung in http://localhost:3003')
})