const mysql=require('mysql');

const db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'myteaponydb'
});

db.connect(function(err){
    if(err) throw err;
    console.log('DATABASE APP CONECTED');
});

module.exports = db;