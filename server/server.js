const mongoExecute  = require('./handleMongo.js').mongoExecute;
var multer		      = require('multer');
var express 	      = require('express');
var bodyParser 	    = require('body-parser');
var webPush         = require('web-push');
var mysql           = require('mysql');
var fs              = require('fs');
var http            = require('http');
var https           = require('https');
var privateKey      = fs.readFileSync('./key.pem', 'utf8');
var certificate     = fs.readFileSync('./cert.pem', 'utf8');
var credentials     = {key: privateKey, cert: certificate};

const path          = require('path');

var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/images/');
  },
  filename: function (req, file, cb) {
    var id = Math.random().toString(16) + Date.now() + path.extname(file.originalname);
    cb(null, id);
  }
});
var upload = multer({ storage: storage }).single('image');

var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Fatecarona'
});

const server = express();
server.use( bodyParser.json() );
server.use( bodyParser.urlencoded({extended: true}));

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Manipulação de usuários
router.route('/users')
  .get(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) res.send(err);

      connection.query('SELECT * FROM membro', function(err, rows, fields) {
        connection.release();
        if (err) res.send(err);
        res.json(rows);
      });
    });
  })
  .post(function(req, res) {
    pool.getConnection(function(err, connection) {
      if(err) res.send(err);

      connection.query('INSERT INTO membro SET ?', req.body, function(err, rows, fields) {
        connection.release();
        if (err) res.send(err);
        res.json({ success: true });
      });
    });
  });

router.route('/users/:user_email')
  .get(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) res.send(err);

      connection.query('SELECT * FROM membro where email = ?',[req.params.user_email], function(err, rows, fields) {
        connection.release();
        if (err) res.send(err);
        res.json(rows[0]);
      });
    });
  })
  .delete(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) res.send(err);

      connection.query('DELETE FROM membro WHERE email = ?', [req.params.user_email], function(err, rows, fields) {
        connection.release();
        if (err) res.send(err);
        res.json({ message: 'Usuário ' + req.params.user_email + ' excluido.'});
      });
    });
  })
  .put(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) res.send(err);

      connection.query('UPDATE membro SET ? WHERE email = ?', [req.body, req.params.user_email], function(err, rows, fields) {
        connection.release();
        if (err) res.send(err);
        res.json(rows);
      });
    });
  });

//Manipulação de rotas

router.route('/routes/:user_email')
  .post(function(req, res) {
    //mongoExecute(insert, [req.body], 'rotas', response => res.send({success: true}));
  })
  .get(function(req, res) {
  	//mongoExecute(find, { email: req.params[0] }, 'rotas', response => res.json(response));
  })
  .put(function(req, res) {
  	//mongoExecute(find, { email: req.params[0] }, 'rotas', response => res.json(response));
  })
  .delete(function(req, res) {
  	//mongoExecute(find, { email: req.params[0] }, 'rotas', response => res.json(response));
  });

//Manipulação de imagens

router.route('/images')
  .post(function (req, res) {
    upload(req, res, function (err) {
      if (err){
        console.log(JSON.stringify(err));
        res.status(400).send('fail saving image');
      } else {
        res.send(res.req.file.filename);
      }
    });
  });

router.route('/images/:file_name')
  .get(function(req, res) {
  	res.sendFile(__dirname + '/images/' + req.params.file_name);
  });

//notificações

var subscriptions = [];

router.route('/subs')
  .post(function(req, res) {
    var body = req.body;
    subscriptions.push({email: body.email, subscription: body.subscription});
    console.log(subscriptions.find(sub => sub.email === body.email));
    notify(subscriptions.find(sub => sub.email === body.email).subscription, 'it worked!');
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
  .catch(err => console.log(err));
}

server.use(router);

var httpsServer = https.createServer(credentials, server);
var httpServer  = http.createServer(server);

httpsServer.listen(8443);
httpServer.listen(8080);

/*http.createServer(function (req, res) {
    res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
    res.end();
}).listen(80);*/

console.log("Servidor HTTP rodando na porta 8080.");
console.log("Servidor HTTPS rodando na porta 8443.");
