var multer		      = require('multer');
var express 	      = require('express');
var bodyParser 	    = require('body-parser');
const config        = require('./config.json').mongodb;
var MongoClient     = require('mongodb').MongoClient;
var ObjectId        = require('mongodb').ObjectId;
var webPush         = require('web-push');
var mysql           = require('mysql');
var fs              = require('fs');
var http            = require('http');
var https           = require('https');
var privateKey      = fs.readFileSync('./key.pem', 'utf8');
var certificate     = fs.readFileSync('./cert.pem', 'utf8');
var credentials     = {key: privateKey, cert: certificate};

const path          = require('path');
const vapidKeys     = require('./vapidKeys.json');
webPush.setGCMAPIKey('AAAANiiw5e4:APA91bFm2hOYB4dD0bQWuHoKFH66sVBB5vIU6vLFSkhQPnuPh18Skj5rN9GP99HUnEjNRyj5Ktz5_v6s0a-9TZKjve8iCOEhwZ10fqaLTZMWqo9fe-WHfiaLKtZvI_fZiN1GP6eRZHDS');
webPush.setVapidDetails(
  'mailto:thiago.ramos9@fatec.sp.gov.br',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

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
  password : '3847147298',
  database : 'Fatecarona'
});

pool.getConnection(function(err, connection) {
  if(err) {
    console.log(err.sqlMessage);
    process.exit();
  }
  connection.release();
});

var mongoPool;

MongoClient.connect(config.url, {poolSize: 10}, (err, db) => {
  if(err) {
    console.log(err);
    process.exit();
  }
  mongoPool = db;
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
      if (err) {
        res.send(err);
        return;
      }

      connection.query('SELECT * FROM membros', function(err, rows, fields) {
        connection.release();
        if (err) {
          res.send(err);
          return;
        }
        res.json(rows);
      });
    });
  })
  .post(function(req, res) {
    pool.getConnection(function(err, connection) {
      if(err) {
        res.send(err);
        return;
      }

      connection.query('INSERT INTO membros SET ?', req.body, function(err, rows, fields) {
        connection.release();
        if (err) {
          res.send(err);
          return;
        }
        res.json({ success: true });
      });
    });
  });

router.route('/users/:user_email')
  .get(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      }

      connection.query('SELECT * FROM membros where email = ?',[req.params.user_email], function(err, rows, fields) {
        connection.release();
        if (err) {
          res.send(err);
          return;
        }
        res.json(rows[0]);
      });
    });
  })
  .delete(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      }

      connection.query('DELETE FROM membros WHERE email = ?', [req.params.user_email], function(err, rows, fields) {
        connection.release();
        if (err) {
          res.send(err);
          return;
        }
        res.json({ message: 'Usuário ' + req.params.user_email + ' excluido.'});
      });
    });


  })
  .put(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) res.send(err);

      connection.query('UPDATE membros SET ? WHERE email = ?', [req.body, req.params.user_email], function(err, rows, fields) {
        connection.release();
        if (err) res.send(err);
        res.json(rows);
      });
    });


  })
  .put(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      }

      connection.query('UPDATE membros SET ? WHERE email = ?', [req.body, req.params.user_email], function(err, rows, fields) {
        connection.release();
        if (err) {
          res.send(err);
          return;
        }
        res.json(rows);
      });
    });
  });

//Manipulação de rotas

router.route('/routes')
  .post(function(req, res) {
    mongoPool.collection('rotas').insertOne(req.body, (err, result) => {
      if(err) {
        res.send(err);
        return;
      }
      res.send(result);
    });
  });

router.route('/routes/:user_email')
  .get(function(req, res) {
    mongoPool.collection('rotas').find({ email: req.params.user_email }).toArray((err, result) => {
      if(err) {
        res.send(err);
        return;
      }
      res.send(result);
    });
  });

router.route('/routes/route/:id_rota')
  .put(function(req, res) {
    mongoPool.collection('rotas').updateOne(
      {_id: new ObjectId(req.params.id_rota)},
      { $set: req.body },
      (err, result) => {
      if(err) {
        res.send(err);
        return;
      }
      res.send(result);
    });
  })
  .delete(function(req, res) {
    mongoPool.collection('rotas').deleteOne(
      {_id: new ObjectId(req.params.id_rota)}, (err, result) => {
        if(err) {
          res.send(err);
          return;
        }
        res.send(result);
    });
  });

//Manipulação de imagens

router.route('/images')
  .post(function (req, res) {
    upload(req, res, function (err) {
      if (err){
        console.log(JSON.stringify(err));
        res.status(400).send('fail saving image');
        return
      }

      res.send(res.req.file.filename);
    });
  });

router.route('/images/:file_name')
  .get(function(req, res) {
  	res.sendFile(__dirname + '/images/' + req.params.file_name);
  });

//Manipulação de Veiculos

router.route('/cars/:user_email')
  .get(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      }

      connection.query('SELECT * FROM veiculos where email = ?',[req.params.user_email], function(err, rows, fields) {
        connection.release();
        if (err){
          res.send(err);
          return;
        }
        res.json(rows);
      });
    });
  });


router.route('/cars/action/:car_placa')

  .put(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      };

      connection.query('UPDATE veiculos SET ? WHERE placa = ?', [req.body, req.params.car_placa], function(err, rows, fields) {
        connection.release();
        if (err) {
          res.send(err);
          return;
        }
        res.json(rows);
      });
    });
  })
  .delete(function(req, res) {
      pool.getConnection(function(err, connection) {
        if (err) res.send(err);

        connection.query('DELETE FROM veiculos WHERE placa = ?', [req.params.car_placa], function(err, rows, fields) {
          connection.release();
          if (err) res.send(err);
          res.json({ message: 'Veículo ' + req.params.car_placa + ' excluido.'});
        });
      });
    });

router.route('/cars')
  .post(function(req, res) {
    pool.getConnection(function(err, connection) {
      if(err) {
        res.send(err);
        return;
      }

      connection.query('INSERT INTO veiculos SET ?', req.body, function(err, rows, fields) {
        connection.release();
        if (err) {
          res.send(err);
          return;
        };
        res.json({ success: true });
      });
    });
  });

//notificações

router.route('/subs')
  .put(function(req, res) {
    mongoPool.collection('subscriptions').updateOne(
      {_id: req.body._id},
      { $set: req.body },
      { upsert: true },
      (err, result) => {
      if(err) {
        res.send(err);
        return;
      }
      res.send(result);
    });
  });

router.route('/notify/:user_email')
  .post(function(req, res) {
    mongoPool.collection('subscriptions').findOne(
      {_id: req.params.user_email},
      (err, result) => {
      if(err) {
        res.send({message: 'notification failed'});
        return;
      }

      var options = {};

      webPush.sendNotification(
        result.subscription, //subscription object
        req.body.message, //payload
        options
      ).catch(err => {
        console.log(err);
        return;
      });
      res.send({message: 'notificação enviada com êxito'});
    });
  });

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
