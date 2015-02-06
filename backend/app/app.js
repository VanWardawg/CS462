var express = require('express'),
	app = express();

var fs=require('fs');

app.set('view engine', 'html');
app.use(express.bodyParser());

app.listen(3000);

app.get('/backend', function(req, res) {
    res.send('Bonjour tout le monde!');
});

var data = fs.readFileSync('/home/ubuntu/dev/CS462/backend/app/data.json');

app.get('/backend/users', function (req, res) {
    try{
    	var test = JSON.parse(data);
      res.json(test);
    }catch(e){
      res.send("No such file or directory");
    }
 });

app.put('/backend/users', function (req, res) {

    try{
    	fs.writeFile("/home/ubuntu/dev/CS462/backend/app/users.txt", data, function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		}); 
      res.json(req.data);
    }catch(e){
      res.send("No such file or directory");
    }
 });

app.post('/backend/users/push', function (req, res) {
	var data2 = req.data;
    try{
      res.json(req.data);
    }catch(e){
      res.send("No such file or directory");
    }
 });