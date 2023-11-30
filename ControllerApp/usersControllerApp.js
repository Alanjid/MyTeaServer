const User=require('../modelsApp/UserApp');

module.exports= {
     
    login(req,res){
        const user=req.body;
        const pass=req.body;
       

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