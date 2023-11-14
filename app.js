const express = require ("express");
const app = express();
const dotenv = require('dotenv')
const mysql= require("mysql");
const cors = require ("cors");
dotenv.config({path: './env/.env'})
const db = require('./database/db')
app.use(cors());
app.use(express.json());

app.get("/login", (req, res) => {
    console.log("asd "+req.body)
    const Correo = req.body.email;
    db.query('SELECT * FROM terapeutas',
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(3003, ()=>{
    console.log('SERVER UP runnung in http://localhost:3003')
})