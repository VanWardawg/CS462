var express = require('express'),
	app = express();

var fs=require('fs');
var uuid = require('node-uuid');
var request = require('request');
app.set('view engine', 'html');
app.use(express.bodyParser());

app.listen(3000);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var peerList1 = [{"url":"https://52.0.11.73/backend/users/26d7e406-0c00-4b85-bb51-5ce814b4cc9a/gossip","id":"26d7e406-0c00-4b85-bb51-5ce814b4cc9a"}];
var peerList2 = [{"url":"https://52.0.11.73/backend/users/e0eb7037-92e7-45b2-bcd7-68e7883665d4/gossip","id":"e0eb7037-92e7-45b2-bcd7-68e7883665d4"}];
var peerList3 = [{"url":"https://52.0.11.73/backend/users/d281c0cc-f063-4fac-b77e-d38e146341d6/gossip","id":"d281c0cc-f063-4fac-b77e-d38e146341d6"}];

app.get('/backend', function(req, res) {
    res.send('Bonjour tout le monde!');
});

var data = JSON.parse(fs.readFileSync('/home/ubuntu/dev/CS462/backend/app/data.json'));
// data.users[0].peers = peerList1;
// data.users[1].peers = peerList2;
// data.users[2].peers = peerList3;

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
			user.rumors = user.rumors || [];
			debug("Adding my own gossip: " + message);
			var rumor = {
				"Rumor": message,
				"EndPoint":"https://52.0.11.73/backend/users/"+user.id+"/gossip"
			}
			user.rumors.push(rumor);
			_user = user;
		}
	});
    writeToFile();
  	res.json(_user);

 });

function addPeer(user, peer){
	user.peers = user.peers || [];
	var found = false;
	for(var j = 0; j < user.peers.length;j++){
		if(user.peers[j].url === peer.url){
			found = true;
			break;
		}
	}
	if(!found){
		user.peers.push(peer);
	}
}

app.post('/backend/users/:id/gossip', function (req, res) {
	var id = req.params.id;
	debug("User:" + id + " Recieving Gossip");
	var _user;
	var message = req.body;
	debug("Message Recieved:" + JSON.stringify(message));
	for(var i = 0; i < data.users.length;i++){
		var user = data.users[i];
		if(id == user.id){
			addPeer(user,{url:message.EndPoint});
			if(message.Rumor){
				var origId = message.Rumor.MessageID.split(":")[0];
				var seqId = message.Rumor.MessageID.split(":")[1];

				user.rumors = user.rumors || [];
				var alreadyHas = false;
				for(var i = 0; i < user.rumors.length; i++){
					if(user.rumors[i].Rumor.MessageID == message.Rumor.MessageID){
						alreadyHas = true;
						break;
					}
				}
				if(!alreadyHas)
					user.rumors.push(message);
				//update peers wants
				for(var i = 0; i < user.peers.length;i++){
					if(user.peers[i].url === message.EndPoint){
						//user.peers[i].rumors = user.peers[i].rumors || [];
						user.peers[i].wants = user.peers[i].wants || {};
						//user.peers[i].rumors.push(message);
						if(!user.peers[i].wants[origId] || user.peers[i].wants[origId] < seqId){
							user.peers[i].wants[origId] = seqId;
						}
						break;
					}
				}
				//update my wants
				user.wants[origId] = user.wants[origId] ||  [];
				if(!user.wants[origId] || user.wants[origId] < seqId){
					user.wants[origId] = seqId;
				}
			}
			else {
				//update peers wants
				var url = message.EndPoint;
				for(var i = 0; i < user.peers.length;i++){
					if(user.peers[i].url === url){
						user.peers[i].wants = user.peers[i].wants || {};
						for(var id in message.Want){
							user.peers.wants[id] = message.Want[id]
						}
						break;
					}
				}
			}
			break;
		}
	}
  	res.send('Success');

 });
app.post('/backend/users/:id/peers', function (req, res) {
	var id = req.params.id;
	var _user;
	var peer = req.body;
	for(var i = 0; i < data.users.length;i++){
		var user = data.users[i];
		if(id == user.id){
			addPeer(user,peer);
		}
	}
    writeToFile();
  	res.json(_user);

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
	var peerIndex = Math.floor((Math.random() * user.peers.length));
	if(peerIndex == user.peers.length){
		peerIndex -= 1;
	}
	return user.peers[peerIndex];
}

function getMessage(user, peer){
	user.rumors = user.rumors || [];
	for(var i = 0; i < user.rumors.length;i++){
		var message = user.rumors[i];
		var origId = message.Rumor.MessageID.split(":")[0];
		var seqId = message.Rumor.MessageID.split(":")[1];
		peer.wants = peer.wants || {};
		if(message.EndPoint !== peer.url){
			if(!peer.wants[origId]){
				peer.wants[origId] = seqId;
				return message.Rumor;
			}
			else if(peer.wants[origId] < seqId){
				peer.wants[origId] = seqId;
				return message.Rumor;
			}
		}
	}
	return undefined;
}

function prepareMessage(user, peer){
	var rumor = Math.floor((Math.random() * 3));
	var message = {};
	if(rumor != 2){
		message.Rumor = getMessage(user,peer);
		if(!message.Rumor){
			return undefined;
		}
	}
	else {
		message.Want = {};
		user.wants = user.wants || {};
		message.Want = user.wants;
	}
	message.EndPoint = "https://52.0.11.73/backend/users/"+user.id+"/gossip";
	return message;
}

function debug(msg){
	var debug = true;
	if(debug){
		console.log(msg);
	}
}

function sendRequest(peer, message){
	if(message.Rumor){
		debug("User sending Rumor msg:" + message.Rumor.MessageID);
	}
	else {
		debug("User sending Want msg");
	}
	debug("Sending to: " + message.EndPoint);
	try{
		request.post(peer.url,{form:message});
	}catch(e){
		debug("Error:" + e);
	}
}

function sendMessage(user) {
	if(!user.peers){
		return;
	}
	debug("User:" + user.id + " is trying to send a msg");
	var msg;
	var peer;
	var i = 0;
	while(i < user.peers.length && !msg){
		peer = getPeer(user);
		debug("to peer:" + peer.id);
		var msg = prepareMessage(user, peer);
		debug("message is:" + msg + " i:" + i + " peer.length:" + user.peers.length);
		i++;
	}
	if(!msg){
		debug("No Message to send so Returning");
		return;
	}
	sendRequest(peer,msg);
}

var minutes = .1, the_interval = minutes * 60 * 1000;
setInterval(function() {
// Run code
	debug("Running message updates");

	for(var i = 0; i < data.users.length;i++){
		sendMessage(data.users[i]);
	}
    writeToFile();
}, the_interval);
