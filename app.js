const express = require ("express");
const app = express();
const dotenv = require('dotenv')
const mysql= require("mysql");
const cors = require ("cors");
const bcryptjs = require('bcryptjs')
dotenv.config({path: './env/.env'})
const db = require('./database/db')
const jwt = require('jsonwebtoken');

const PacientesRoutes = require('./routes/pacientes')
const TerapeutasRoutes = require('./routes/terapeuta')

app.use(cors( {origin: process.env.FRONTED_URL} ));
app.use(express.json());

//rutas
app.use(PacientesRoutes)
app.use(TerapeutasRoutes)

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
                const expirar= req.body.recordarme
                if(expirar){
                    const datosToken = {
                        correo: result[0].correo,
                        nombre: result[0].nombre,
                        app: result[0].app,
                        apm: result[0].apm,
                        rol: result[0].rol,
                        idinstitucion: result[0].idinstitucion,
                    };
                    const token = jwt.sign(datosToken, process.env.JWTSecret);
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
                    res.send(Resultado);
                }else{
                    const datosToken = {
                        correo: result[0].correo,
                        nombre: result[0].nombre,
                        app: result[0].app,
                        apm: result[0].apm,
                        rol: result[0].rol,
                        idinstitucion: result[0].idinstitucion,
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
                    res.send(Resultado);
                }
            }
        }
    });
});

app.post("/user", (req, res) => {
    try {
        if(req.body.token){
            const Token = req.body.token;
            const body = jwt.decode(Token, process.env.JWTSecret);
            const correo = req.body.correo;
            const nombre = req.body.nombre;
            const app = req.body.app;
            const apm = req.body.apm;
            const rol = req.body.rol;
            let idinstitucion = req.body.idinstitucion;
            if(idinstitucion === '1'){
                idinstitucion = 1
            }else if(idinstitucion === '2'){
                idinstitucion = 2
            }
            const arrar = {
                correo,
                nombre,
                app,
                apm,
                rol,
                idinstitucion,
            }
            try {
                if(body.iat){
                    delete body.iat;
                }
                if(body.exp){
                    delete body.exp;
                }
            } catch (error) {
                console.log('No tiene fecha de venticimiento')
            }
            if(JSON.stringify(arrar) === JSON.stringify(body)){
                jwt.verify(Token, process.env.JWTSecret, function(err, decoded){
                    if(err){
                        res.send('false')
                    }else{
                        res.send('true')
                    }
                })
            }else{
                res.send('false')
            }
        }
    } catch (error) {
        console.log('Algo trono xd')
    }
});

/* app.get("/pacientes", (req, res) => {
    console.log(req.query.terapeuta)    
    const paciente_id = req.query.terapeuta
    
    //db.query()
    res.send('hola')
});
 */








app.listen(process.env.PORT, ()=>{
    console.log('SERVER UP runnung in http://localhost:3003')
})