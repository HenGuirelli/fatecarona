const mongoExecute  = require('./handleMongo.js').mongoExecute;
var multer		      = require('multer');
var express 	      = require('express');
var bodyParser 	    = require('body-parser');
var webPush         = require('web-push');
var mysql           = require('mysql');

var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '3847147298',
  database : 'Fatecarona'
}); 

const upload = multer({ dest: './images/' });

const server = express();
server.use( bodyParser.json() );
server.use( bodyParser.urlencoded({extended: true}));
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Manipulação de usuários

server.get('/users/*', function(req, res) {
	mongoExecute(find, {email: req.params[0]}, 'users', response => res.json(response));
});

server.get('/users', function(req, res) {
	mongoExecute(list, null, 'users', response => res.json(response));
});

server.post('/users', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {
      res.json(err);
      return;
    }
    connection.query('INSERT INTO membro SET ?', req.body, function(err, rows, fields) {
      connection.release();
      if (err) res.json(err);
      else res.send({success: true});
    });
  });
});

server.get('/userstest', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {
      res.json(err);
      return;
    }
    connection.query('SELECT * FROM membro', function(err, rows, fields) {
      connection.release();
      if (err) res.json(err);
      else res.json(rows);
    });
  });
});

//Manipulação de rotas

server.post('/routes', (req, res) => {
	mongoExecute(insert, [req.body], 'rotas', response => res.send({success: true}));
});

server.get('/routes/*', (req, res) => {
	mongoExecute(find, { email: req.params[0] }, 'rotas', response => res.json(response));
});

server.post('/images', upload.single('avatar'), (req, res) => {
	if(!req.file) {
		console.log("No file received");
		return res.send({
			success: false
		});
	}
	console.log('File received');
	return res.send({
		success: true
	});
});

server.get('/images/*', (req, res) => {
	res.sendFile(__dirname + '/images/' + req.params[0]);
});

//notificações

var subscriptions = [];

server.post('/subs', (req, res) => {
  var body = req.body;
  subscriptions.push({email: body.email, subscription: body.subscription});
  notify(subscriptions[0].subscription, 'it worked!');
  res.send({subscribed: true});
});

function notify(subscription, payload) {
  var options = {
    gcmAPIKey: 'AAAANiiw5e4:APA91bFm2hOYB4dD0bQWuHoKFH66sVBB5vIU6vLFSkhQPnuPh18Skj5rN9GP99HUnEjNRyj5Ktz5_v6s0a-9TZKjve8iCOEhwZ10fqaLTZMWqo9fe-WHfiaLKtZvI_fZiN1GP6eRZHDS',
    TTL: 60
  };

  webPush.sendNotification(
    subscription,
    payload,
    options
  )
  .then(() => console.log('notification sent.'))
  .catch(err => console.log(err));
}

server.listen(8080);
console.log("Servidor rodando na porta 8080");