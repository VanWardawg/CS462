var express = require('express'),
	app = express();

var fs=require('fs');

app.set('view engine', 'html');
app.use(express.bodyParser());

app.listen(3000);

var data = require('/home/ubuntu/dev/CS462/backend/app/data.json');

app.get('/backend', function(req, res) {
    res.send('Bonjour tout le monde!');
});

app.get('/backend/users', function (req, res) {
    try{
      var data2=fs.readFileSync('/home/ubuntu/dev/CS462/backend/app/users.txt','utf8');
      res.end(data);
    }catch(e){
      res.end("No such file or directory");
    }
  });