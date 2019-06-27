const express = require('express')  
const path = require('path')  
const cors = require('cors') 
require('dotenv').config() 
 

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 

app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use(express.static(path.join(__dirname, '../src/build')));

app.use(cors())
app.use( '/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))) 
app.use(require('./routes'))

app.use(function(req, res){
    res.sendFile(path.join(__dirname, '../src/build', 'index.html'))
});
server.listen(process.env.PORT || '5000')
// server.listen(3333)
