var express = require('express'),
	app = express();

var fs=require('fs');
var uuid = require('node-uuid');
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
	var user = req.body;
	user.id = uuid.v4();
	data.users.push(user);

    writeToFile(); 
    res.json(req.body);
 });

app.post('/backend/users/:id/message', function (req, res) {
	var id = req.params.id;
	var _user;
	var message = req.body;
	data.users.forEach(function (user) {
		if(id === user.id){
			user.messages = user.messages || [];
			user.messages.push(message);
			user.rumors = user.rumors || {};
			user.rumors[id] = user.rumors[id] || [];
			var rumor = {
				"Rumor": message,
				"EndPoint":"https://52.0.11.73/backend/users/"+user.id+"gossip"
			}
			user.rumors[id].push(rumor);
			_user = user;
		}
	});
    writeToFile();
  	res.json(_user);

 });

app.post('/backend/users/:id/gossip', function (req, res) {
	var id = req.params.id;
	var _user;
	var message = req.body;
	data.users.forEach(function (user) {
		if(id === user.id){
			var origId = message.MessageID.split(":")[0];
			if(message.rumor){
				user.rumors[origId].push(message);
			}
			else {
				for(var i = 0; i < user.peers.length;i++){
					if(user.peers[i].id === origId){
						user.peers[i].wants = user.peers[i].wants || [];
						user.peers[i].wants.push(message);
						break;
					}
				}
				// TODO - add message to processing queue
			}
		}
	});
    writeToFile();
  	res.send('Success');

 });

app.post('/backend/users/push', function (req, res) {
	var _user;
	var checkin = JSON.parse(req.body.checkin);
	data.users.forEach(function (user) {
		if(checkin.user.id === user.id){
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

function getPeer(user) {
	if(!user.peers){
		return;
	}
	user.peers = user.peers || [];
	peerIndex = Math.floor((Math.random() * user.peers.length) + 1);
	return user.peers[i];
}

function sendMessage(user) {
}

var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
// Run code
	for(var i = 0; i < data.users.length;i++){
		sendMessage(data.users[i]);
	}
}, the_interval);