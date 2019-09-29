const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:  'api_rest_nodejs',
    multipleStatements:true
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('db connected')
    }
});

module.exports = mysqlConnection;