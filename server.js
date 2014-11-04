var express = require('express');
var path = require('path');
var morgan = require('morgan');
var ZendeskApiClient = require('zendesk-api-client');
var json = require('express-json');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var client = new ZendeskApiClient({
  hostname :process.env.ZENDESK_HOSTNAME,
  username :process.env.ZENDESK_USERNAME,
  apiToken :process.env.ZENDESK_API_KEY
});

var app = express();
app.set('port', process.env.PORT || 3333);
app.use(morgan('dev'));
app.use(json());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express["static"](path.join(__dirname, 'public')));

if ('development' === app.get('env')) {
  app.use(errorHandler());
}

app.get('/app.js', function(req, res) {
  return res.sendFile('./public/app.js', {root: path.join(__dirname, '.')});
});

app.get('/app.css', function(req, res) {
  return res.sendFile('./public/app.css', {root: path.join(__dirname, '.')});
});

app.get(/api.+/, function(req, res){
  var url = req.originalUrl;
  client.get(url, function (apiRes, err){
    var data = '';
    if (err) {
      //handle errors
      return console.error(err);
    }
    apiRes.on('data', function(chunk){
      data += chunk;
    });
    apiRes.on('end', function() {
      var dataObj = JSON.parse(data);
      res.type('application/json');
      res.json(dataObj);
    });
  })
});

exports.startServer = function(port, path, callback){
  // Starting our server
  app.listen(port, function() {
    return console.log('Express server listening on port ' + port);
  });
  callback();
}
