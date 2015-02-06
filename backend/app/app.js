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
    try{
      var data=fs.readFileSync('/home/ubuntu/dev/CS462/backend/app/users.txt','utf8');
      res.end(JSON.parse(data));
    }catch(e){
      res.end("No such file or directory");
    }
  });