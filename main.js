/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//$sudo service mongod start
//$mongo

var express = require('express'),
    wine = require('./routes/wines');
 
//to get put (update) and post (insert)    
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
 
var app = express();
//to get put (update) and post (insert)
app.use(bodyParser.json());
 
//app.use(bodyParser.urlencoded({extended: false}));


app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
 
app.listen(3000);
console.log('Listening on port 3000...');