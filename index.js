var http = require('http');
var express = require('express');
var fs = require('fs');

var app = express();

app
    .use(express.static('public'))
    .get('/home/login', function (req, res) {
        console.log('Login request');
        res.status(200).send('Login from server.');
    })
     .get('/config/*', function (req, res) {

        console.log(req);

        res.sendfile(__dirname + req.originalUrl);

    })
    .get('/home/firebase', function (req, res) {

        var jsonString = JSON.stringify(req.query);

        fs.writeFile(__dirname + "/config/data.json", jsonString, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 

        res.status(200).send('firebase');
    })
    .all('/*', function ( req, res ) {
        console.log('All');
        res
            .status( 200 )
            .set( { 'content-type': 'text/html; charset=utf-8' } )
            .sendfile('public/index.html' );
    })
    .on( 'error', function( error ){
       console.log( "Error: \n" + error.message );
       console.log( error.stack );
    });

http
    .createServer( app ).listen( 8080 )
    .on( 'error', function( error ){
       console.log( "Error: \n" + error.message );
       console.log( error.stack );
    });

console.log('Serving app on port 8080');