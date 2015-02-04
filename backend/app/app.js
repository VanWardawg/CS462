var express = require('express'),
	app = express();
  
var fs=require('fs');

app.set('view engine', 'html');
app.use(express.bodyParser());

app.listen(3000);

app.get('/backend', function(req, res) {
    res.send('Bonjour tout le monde!');
});

app.get('/backend/users', function (req, res) {
    res.send({headers: req.headers, queryParams: req.query, body: req.body});
  });