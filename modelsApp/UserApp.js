const db =require('../configAPP/configApp');
const bcrypt = require('bcryptjs');

const User={};

//Crear nuevo usuario
User.create = async (user, result)=>{

    const hash=await bcrypt.hash(user.password,8); 

    const sql= `
        INSERT INTO 
        pacientes(
            karnet,
            nombre,
            app,
            apm,
            username,
            password,
            fecha,
            diagnostico,
            idinstitucion,
            isactive
        )
        VALUES(?,?,?,?,?,?,?,?,?,?)
    `;
    db.query
(
    sql,
    [
        user.karnet,
        user.nombre,
        user.app,
        user.apm,
        user.username,
        hash,
        user.fecha,
        user.diagnostico,
        user.idinstitucion,
        user.isactive
    ],
    (err,res)=> {
        if(err){
            console.log('Error: ',err);
            result(err, null);
        }
        else{
            console.log('Id del nuevo usuario: ', res.insertId);
            result(null,res.insertId);
        }
    }
)

}
module.exports=User;




