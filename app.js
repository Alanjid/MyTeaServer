const express = require ("express");
const app = express();
const dotenv = require('dotenv')
const mysql= require("mysql");
const cors = require ("cors");
dotenv.config({path: './env/.env'})
const PacientesRoutes = require('./routes/pacientes')
const LogIn = require('./routes/LogIn')

app.use(cors( {origin: process.env.FRONTED_URL} ));
app.use(express.json());

//rutas
app.use(PacientesRoutes)
app.use(LogIn)

app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    next();
});

app.listen(process.env.PORT, ()=>{
    console.log('SERVER UP runnung in http://localhost:3003')
})