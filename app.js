const express = require ("express");
const app = express();
const dotenv = require('dotenv')
const mysql= require("mysql");
const cors = require ("cors");
const bcryptjs = require('bcryptjs')
dotenv.config({path: './env/.env'})
const db = require('./database/db')
app.use(cors( {origin: process.env.FRONTED_URL} ));
app.use(express.json());
const session = require('express-session');

app.use(session({
    secret: 'SSecret',
    cookie: { 
        sameSite: 'strict',
        maxAge: null,
        expires: null
    },
    saveUninitialized: false
}));

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
                res.send(result);
                
            }
        }
    });
});

app.listen(process.env.PORT, ()=>{
    console.log('SERVER UP runnung in http://localhost:3003')
})