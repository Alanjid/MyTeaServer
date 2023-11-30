const usersControllerApp=require('../ControllerApp/usersControllerApp');

module.exports= (app)=>{

    app.post('/paciente/create',usersControllerApp.register);
}