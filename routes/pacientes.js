const express = require('express')
const db = require('../database/db')
const router = express.Router()

router.get("/pacientes", (req, res) => {
    console.log(req.query.correo)        
    const paciente_id = req.query.correo
    const sql = 'SELECT pacientes.karnet, pacientes.nombre, pacientes.app, pacientes.apm, pacientes.fecha, pacientes.diagnostico FROM relacionados INNER JOIN pacientes ON pacientes.karnet = relacionados.idpacientes WHERE relacionados.idterapeutas = ?'
    db.query(sql,[paciente_id], async(error,response)=>{
        if (error){
            res.status(500).send('Error al obtener los datos de la base de datos');
        }else{
            res.send(response)
        }
    }) 
});
router.get("/paciente", (req, res) => {
    
    const paciente_karnet = req.query.karnet
    const sql = 'SELECT pacientes.karnet, pacientes.nombre, pacientes.app, pacientes.apm, pacientes.fecha, pacientes.diagnostico, institucion.nombre as institucion, institucion.estado FROM pacientes INNER JOIN institucion ON pacientes.idinstitucion = institucion.id WHERE karnet = ?'
    db.query(sql,[paciente_karnet], async(error,response)=>{
        if (error){
            res.status(500).send('Error al obtener los datos de la base de datos');
        }else{
            res.send(response)
        }
    }) 
});

module.exports = router