const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);


//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Routes
app.use(require('./routes/employees'));

//Start server
app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});