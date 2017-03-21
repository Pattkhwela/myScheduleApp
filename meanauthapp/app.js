const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');


//Connecte to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', () =>{
    console.log('Connected to database '+config.database);
});

//On error
mongoose.connection.on('error', (err) =>{
    console.log('Database error '+err);
});

const app = express();

const users = require('./routes/users');

//Port variable
const port = 3000;


//Cors middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser middleware
app.use(bodyParser.json());

app.use('/users', users);


//Index route
app.get('/', (req, res) =>{
    res.send('Invalid Endpoint');
});

//Server starter
app.listen(port, () =>{
    console.log('Server started on port: '+ port);
});