const express = require('express')
const db = require('../database/db')
const router = express.Router()
const jwt = require('jsonwebtoken');

router.get("/terapeuta", (req, res) => {            
    const user_correo = jwt.decode(req.headers.authorization, process.env.JWTSecret).correo
    console.log(user_correo) 

    const sql = 'SELECT correo,nombre,app,apm FROM terapeutas WHERE correo= ?'
    
    db.query(sql,[user_correo], async(error,response)=>{
        if (error){
            res.status(500).send('Error al obtener los datos de la base de datos');
        }else{
            res.send(response[0])
        }
    })  
});


module.exports = router