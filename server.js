// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var exerciesRoutes=require('./exerciesRoutes.js');
var bodyParser=require('body-parser');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.send('exercice tracker api; routes: POST api/exercise/add {userId*,description*,duration*(min),date(yyyy-mm-dd)};'
           +'POST api/exercise/new-user {username*};'
           +'GET api/exercise/log?{userId}[&from][&to][&limit]');
});

app.use('/api/exercise',exerciesRoutes);


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
