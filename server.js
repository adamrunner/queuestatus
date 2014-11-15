var express          = require('express');
var path             = require('path');
var morgan           = require('morgan');
var ZendeskApiClient = require('zendesk-api-client');
var json             = require('express-json');
var bodyParser       = require('body-parser');
var methodOverride   = require('method-override');
var errorHandler     = require('errorhandler');
var testData         = require('./test-data');
var currentToken;

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var client = new ZendeskApiClient({
  hostname :process.env.ZENDESK_HOSTNAME,
  username :process.env.ZENDESK_USERNAME,
  apiToken :process.env.ZENDESK_API_KEY
});

var app = express();
app.set('port', process.env.PORT || 3333);
app.use(morgan('dev'));
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

app.post('/auth.json', urlencodedParser, function(req, res) {
  res.set('Content-Type', 'application/json')
  var body = req.body,
      username = body.username,
      password = body.password;

  if (username == 'test@test.com' && password == 'test') {
    // Generate and save the token (forgotten upon server restart).
    currentToken = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    res.json({
      success: true,
      token: currentToken
    });
  } else {
    res.json({
      success: false,
      message: 'Invalid username/password'
    });
  }
});

app.post('/checkauth.json', urlencodedParser, function(req, res){
  var token = req.body.token
  if (token === currentToken){
    res.json({
      success: true
    })
  }else{
    res.send(401, {error: "Invalid token! Token: " + token});
  }
});

app.get('/api/v2/users.json', function(req, res){
  res.json(testData.userList);
});

app.get('/api/v2/channels/voice/stats/current_queue_activity.json', function(req, res){
  res.json(testData.randomQueueData());
});

app.get('/api/v2/channels/voice/stats/agents_activity.json', function(req, res){
  res.json(testData.randomAgentActivity());
});

exports.startServer = function(port, path, callback){
  // Starting our server
  app.listen(port, function() {
    return console.log('Express server listening on port ' + port);
  });
  callback();
}
