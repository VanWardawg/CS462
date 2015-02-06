var express = require('express'),
	app = express();

var fs=require('fs');

app.set('view engine', 'html');
app.use(express.bodyParser());

app.listen(3000);

app.get('/backend', function(req, res) {
    res.send('Bonjour tout le monde!');
});

var data = JSON.parse(fs.readFileSync('/home/ubuntu/dev/CS462/backend/app/data.json'));

app.get('/backend/users', function (req, res) {
    try{
      res.json(data);
    }catch(e){
      res.send("No such file or directory");
    }
 });

app.put('/backend/users', function (req, res) {
	var user;
	for(var i = 0; i < data.users.length;i++){
		if(req.body.username == data.users[i].username){
			data.users[i] = req.body;
			user = data.users[i];
			break;
		}
	}
    writeToFile(); 
    res.json(user);
 });

app.post('/backend/users', function (req, res) {
	data.users.push(req.body);
    writeToFile(); 
    res.json(req.body);
 });

app.post('/backend/users/push', function (req, res) {
	var _user;
	var checkin = JSON.parse(req.body.checkin);
	console.log(JSON.parse(req.body.checkin));
	data.users.forEach(function (user) {
		console.log('here');
		console.log(user.id);
		console.log(checkin.user);
		if(checkin.user.id === user.id){
			console.log('matchy time');
			user.checkins = user.checkins || [];
			user.checkins.push(checkin);
			_user = user;
		}
	});
    writeToFile();
  	res.json(_user);

 });

function writeToFile(){
	try{
    	fs.writeFile("/home/ubuntu/dev/CS462/backend/app/data.json", JSON.stringify(data), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		}); 
    }catch(e){
    	console.log(e);
    }
}