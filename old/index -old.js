var express = require('express')
, app = express()

  // static - all our js, css, images, etc go into the assets path
  app.use('/assets', express.static('/assets'));
  //If we get here then the request for a static file is invalid so we may as well stop here
  app.use('/assets', function(req, res, next) {
    res.send(404);
  });

  // This route deals enables HTML5Mode by forwarding missing files to the index.html
  app.all('/', function(req, res) {
    console.log('OK');
    res.sendfile('index.html');
  });


app.listen(9000);
