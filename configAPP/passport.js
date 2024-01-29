const JwtStrategy = require('passport-jwt').Strategy;
const ExtraJwt= require('passport-jwt').ExtractJwt;
const Keys= require('./keys');
const User= require('../modelsApp/UserApp');

module.exports = (passport)=> {
    let opts = {};
    opts.jwtFromRequest = ExtraJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;

    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {

        User.findById(jwt_payload.karnet, (err,user)=>{
            if(err){
                return done(err,false);
            }
            if (user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        });
    }));
}