var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/login';
var fs = require('fs');

var http = require('http');


function redirect(response) {
    var body = "Redirecting...";
    
    response.writeHead(302, {
         'Content-Type': 'text/html',
         'Location': '/logged_in_user'
    });
    response.end(body);
}

/*function show_body(response, data) {
    response.write("<p>Name: " + data.name + "</p>");
    response.end();
}*/


var insertDocument = function(db, data, file, callback) {
    
    db.collection('users').insertOne( {
        "name": data.name.toString(),
        "user_name": data.user_name.toString(),
        "password": data.user_password.toString(),
        "email": data.email.toString(),
        "phone": data.phone.toString(),
        "image": file
    }, function(error, result) {
            assert.equal(error, null);
            console.log("Inserted document to USERS collection!");
            //callback();
  });    
};

var findStudents = function(db, data, response, callback) {
    var cursor = db.collection('users').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            if( ((doc.user_name == data.user_name.toString()) || doc.email == data.user_name.toString() ) && doc.password == data.user_password ) {
                var decodedImageDb;
                //decodedImage = new Buffer(doc.data, 'base64');
                if(doc.image) {
                    //response.write(doc.data);
                    decodedImageDb = new Buffer(doc.image, 'base64');
                }
                fs.writeFileSync("./files/database_image.jpg", decodedImageDb); 
                redirect(response);
            }
            //fs.writeFileSync("./database_image.jpg", doc.file); 
        }
        else {
            response.end();
            callback();
        } 
        //response.end();
    });
};

exports.insert = function(data, file) {
    MongoClient.connect(url, function(error, db) {
                assert.equal(null, error);
                insertDocument(db, data, file, function() {
                    db.close();
                    //console.log(data.login.toString());
                });
            });
}

exports.show_all = function(response, data) {
    MongoClient.connect(url, function(err, db) {
              assert.equal(null, err);
              findStudents(db, data, response, function() {
                  ;//db.close();
              });
            });
}

