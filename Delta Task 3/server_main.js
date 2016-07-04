var qs = require('querystring');
count = 0;

var database_file = require("./db/database.js")
var http = require('http');
var fs = require('fs');

var formidable = require('formidable'),
      util = require('util');

var base64Image;
var decodedImage;


var server = http.createServer(function(request, response) {
    
    //-----------------------------------------------------------login/get----------------------------------------------------------------
    
    if(request.url == '/' && request.method == 'GET') {
        response.setHeader('Content-Type', 'text/html');
        var read = fs.createReadStream('./views/login.html');
        var body = '';
        read.on('data', function(chunk) {
            body += chunk;
        });
        read.on('end', function() {
            response.end(body);
        });
    }
    
    //-----------------------------------------------------------signup/get---------------------------------------------------------------
    
    if(request.url == '/signup' && request.method == 'GET') {
        response.setHeader('Content-Type', 'text/html');
        var read = fs.createReadStream('./views/signup.html');
        var body = '';
        read.on('data', function(chunk) {
            body += chunk;
        });
        read.on('end', function() {
            response.end(body);
        });
    }
    
    //------------------------------------------------------------signup/post-------------------------------------------------------------
    
    if(request.url == '/signup-p' && request.method == 'POST') {
        var form = new formidable.IncomingForm();
        var fields = [];
        var file = '';
        response.setHeader("Content-Type", "text/plain");
        
        form.uploadDir = "./files";
        form.keepExtensions = true;
        
        form.on('error', function(err) {
             throw err;
             })

       /* this is where the renaming happens */
        .on ('fileBegin', function(name, file){
             //rename the incoming file to the file's name
             file.path = "files\\temp_store.jpg";
        });
        
        form.on('field', function (field, value) {
            if(field.toLowerCase() != 'user_password')
                response.write(field + ":" + value + "\n");
            fields[field] = value;
        });
        
        form.on('end', function () {
                        file = fs.readFileSync("./files/temp_store.jpg");
            fs.writeFileSync("./files/image_show.jpg", file);
            
            fs.readFile('./files/temp_store.jpg', function(err, original_data){
                fs.writeFile('./files/image_show2.jpg', original_data, function(err) {});
                base64Image = original_data.toString('base64');
                decodedImage = new Buffer(base64Image, 'base64');
                fs.writeFile('./files/image_decoded.jpg', decodedImage, function(err) {});
                database_file.insert(fields, base64Image);
                response.end("\n\n\n\n\n\nEnd!!!!!");
            });
            
            

            
        });
        
        form.parse(request);
        
        function writeFile() {
            fs.writeFileSync("./file.png", file);
        }
    }
    
    //------------------------------------------------------------login/post--------------------------------------------------------------
    
    if(request.url == '/login-p' && request.method == 'POST') {
        var form = new formidable.IncomingForm();
        var fields = [];
        var file = '';
        
        form.uploadDir = "./files";
        form.keepExtensions = true;
        
        response.setHeader('Content-Type', 'text/html');
        
        form.on('error', function(err) {
             throw err;
        })

       /* this is where the renaming happens */
        .on ('fileBegin', function(name, file){
             //rename the incoming file to the file's name
             file.path = "files\\temp_store.jpg";
        });
        
        form.on('field', function (field, value) {
            fields[field] = value;
        });
        
        form.on('end', function () {
            file = fs.readFileSync("./files/temp_store.jpg");
            fs.writeFileSync("./files/image_show.jpg", file);
            database_file.show_all(response, fields);
        });
        
        form.parse(request);
        
        function writeFile() {
            fs.writeFileSync("./file.png", file);
        }
    }
    
    //---------------------------------------------------logged_in/get--------------------------------------------------------------------
    
    
    if(request.url == '/logged_in_user' && request.method == 'GET') {
        console.log("Logged In!!");
        //response.setHeader('Content-Type', 'text/html');
        var read = fs.createReadStream('./views/logged_in.html');
        var body = '';
        read.on('data', function(chunk) {
            body += chunk;
        });
        read.on('end', function() {
            response.end(body);
        });
    }
    
    
    //----------------------------------------------------------------------------------------------------------
    
});

server.listen(2222, "127.0.0.1");
