const express = require ("express");
const app = express();
const dotenv = require('dotenv')
const mysql= require("mysql");
const cors = require ("cors");
dotenv.config({path: './env/.env'})
const PacientesRoutes = require('./routes/pacientes')
const LogIn = require('./routes/LogIn')
const usersRoutes = require('./routes/userRoutesApp');
const passport=require('passport');

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

require('./configAPP/passport')(passport);

//rutas
app.use(PacientesRoutes)
app.use(LogIn)
usersRoutes(app);

app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    next();
});
app.listen(3003,()=>{
    console.log('SERVER UP running in http://localhost:3003')
})