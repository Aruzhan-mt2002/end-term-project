var http = require('http');
var fs = require('fs');
var path = require('path');


http.createServer(function (request, response) {
    console.log('request ', request.url); 

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    } 
    
    else if (filePath == './about') {
        filePath = './about.html';
    } 
    
    else if (filePath == './img/gallery/graduation'){
        filePath = './img/gallery/graduation.jpg';
    } 
    
    else if (filePath == './img/gallery/study') {
        filePath = './img/gallery/study.jpg';
    }

    else if (filePath == './video/memes') {
        filePath = './video/students/memes.mp4';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.mp4': 'video/mp4',
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./error.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('500 - Internal error with a response code 500 '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');