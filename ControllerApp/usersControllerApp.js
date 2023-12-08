const User=require('../modelsApp/UserApp');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const keys=require('../configAPP/keys');
module.exports= {
     
    login(req,res){
        const username=req.body.username;
        const password=req.body.password;
        User.findByUsername (username,async (err,myUser)=>{
            
            console.log('Error: ',err);
            console.log('Usuario: ',myUser);
            if(err){
                return res.status(501).json({
                    success: false,
                    message:'hubo un error con el login',
                    error:err
                });
            }
            if(!myUser){
                return res.status(401).json({ //EL  CLIENTE NO TIENE AUTORIZACION PARA REALIZAR PETICION
                    success: false,
                    message:'Usuario no encontrado',
                    error:err
                });
            }
            const isPasswordValid = await bcrypt.compare(password,myUser.password);

            if ( isPasswordValid){
                const token= jwt.sign({
                    karnet: myUser.karnet, username: myUser.username},keys.secretOrKey,{});
                    const data =  {
                        karnet: `${myUser.karnet}`,
                        nombre: myUser.nombre,
                        app: myUser.app,
                        apm: myUser.apm,
                        username: myUser.username,
                        password: myUser.password,
                        fecha: myUser.fecha,
                        diagnostico: `${myUser.diagnostico}`,
                        idinstitucion: `${myUser.idinstitucion}`,
                        isactive: `${myUser.isactive}`,
                        session_token: `JWT ${token}`
                    }
                    return res.status(201).json({
                        success: true,
                        message:'El usuario fue autenticado',
                        data: data //ID DEL NUEVO USUARIO logueado
                    });
            }
            else{
                return res.status(401).json({ //EL CLIENTE NO TIENE AUTORIZACION PARA REALIZAR PETICION
                    success: false,
                    message:'Password incorrecta',
                    error:err
                });
            }
            
        });
    },

    register(req,res){
        const user= req.body;
        User.create(user,(err,data)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message:'hubo un error con el registro',
                    error:err
                });
            }
            return res.status(201).json({
                success: true,
                message:'Registro correcto',
                data: data //ID DEL NUEVO USUARIO REGISTRADO
            });
        });
    }
}