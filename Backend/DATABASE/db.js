const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ERIKmama21',
    database: '3pos3'

})

conexion.connect((error)=>{
    if(error){
        console.error('El error de la conexion es: '+error);
        return
    }
    console.log("Conectado a la BD!");
})

module.exports = conexion;