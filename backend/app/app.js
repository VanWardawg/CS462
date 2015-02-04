var express = require('express'),
	app = express();

app.set('view engine', 'html');
app.use(express.bodyParser());

app.listen(3000);

app.get('/', function(req, res) {
    res.send('Bonjour tout le monde!');
});

app.get('/users', require('./users')(app));