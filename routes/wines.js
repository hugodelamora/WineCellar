//var Wine = require('../models/wine');
 
var mongo = require('mongodb');
//mongo.BSONPure = require('bson').BSONPure;
 
var databaseName = 'winedb',       
collectionName = 'wines';
        
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
    //BSON = require('mongodb').BSONPure;
     
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db(databaseName, server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'winedb' database");
        db.collection(collectionName, {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
console.log("...");
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    //collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
    //var o_id = new BSON.ObjectID(id);
 
    db.collection('wines', function(err, collection) {
        //collection.find({"country":"Spain"}).toArray(function(err, items) {
        //collection.find({'country':id}).toArray(function(err, items) {
        collection.find({'_id':new require('mongodb').ObjectID(req.params.id)}).toArray(function(err, items) {
           
         
        res.send(items);
        });
    });
};
/*
exports.findAll = function(req, res) {
    Wine.find(function(err,wines){
        if(err){
            console.log(err.message);
            rest.send(500,err.message);
        }
        console.log('all wine');
        rest.status(200).jsonp(wines);
    })
}*/
 
 
exports.findAll = function(req, res) {
    db.collection('wines', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addWine = function(req, res) {
    var wine = req.body;
     
    console.log('Adding wine0: ' + wine);
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('wines', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
       
        //collection.insert({
        //'name':'LAN RIOJA CRIANZA',
        //'year':'2006',
        //'grapes':'Tempranillo',
        //'country':'Spain',
        //'region':'Rioja',
        //'description':'A resurgence of interest in boutique vineyards...',
        //'picture':'lan_rioja.jpg'},{safe:true}, function(err, result) {
     
        if (err) {
     res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};
 
exports.updateWine = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wineid: ' + id + ' wine:'+wine);
    console.log(JSON.stringify(wine));
    db.collection('wines', function(err, collection) {
          collection.update({'_id':new require('mongodb').ObjectID(req.params.id)}, wine, {safe:true}, function(err, result) {
          //collection.update({'_id':new require('mongodb').ObjectID(req.params.id)}, {'yearid':'1000'}, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
};
 
exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('wines', function(err, collection) {
        collection.remove({'_id':new require('mongodb').ObjectID(req.params.id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};
 
/*
exports.findAll = function(req, res) {
    console.log('All Wines Request');
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};
 
exports.findById = function(req, res) {
    console.log('id='+req.params.id);
    res.send({id:req.params.id, name: "The Name", description: "description"});
};*/
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
/*
var populateDB = function() {
    var wines = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];
    db.collection('wines', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {});
    });
};
*/