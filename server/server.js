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

router.route('/members/:user_email')
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
  })
  .get(function(req, res) {
    mongoPool.collection('rotas').findOne(
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

//Busca o veiculo da carona pelo ID
router.route('/cars/lift/:car_id')
  .get(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      }

      connection.query('SELECT * FROM veiculos where id = ?',[req.params.car_id], function(err, rows, fields) {
        connection.release();
        if (err){
          res.send(err);
          return;
        }
        res.json(rows);
      });
    });
  });


//Busca todos os veiculos do motorista
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


//Atualização do status do veiculo
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

  //Exclusão do veiculo
  .delete(function(req, res) {
      pool.getConnection(function(err, connection) {
        if (err) {
          res.send(err);
          return;
        }

        connection.query('DELETE FROM veiculos WHERE placa = ?', [req.params.car_placa], function(err, rows, fields) {
          connection.release();
          if (err) {
            res.send(err);
            return;
          }
          res.json({ message: 'Veículo ' + req.params.car_placa + ' excluido.'});
        });
      });
    });

//Inserção de um novo veiculo
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

//Marca / Modelo dos carros
router.route('/cars/marcas/:marca')
  .get(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      }

      connection.query('SELECT * FROM carro_marca where marca = ?', [req.params.marca], function(err, rows, fields) {
        connection.release();
        if (err){
          res.send(err);
          return;
        }
        res.json(rows);
      });
    });
  });

  router.route('/cars/modelos/:id')
    .get(function(req, res) {
      pool.getConnection(function(err, connection) {
        if (err) {
          res.send(err);
          return;
        }

        connection.query('SELECT * FROM carro_modelo where id = ?',[req.params.id], function(err, rows, fields) {
          connection.release();
          if (err){
            res.send(err);
            return;
          }
          res.json(rows);
        });
      });
    });

//Manipulação de Caronas

router.route('/lift/members')
  .post(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      }
      connection.query('INSERT INTO membros_carona SET ?',[req.body], function(err, rows, fields) {
        connection.release();
        if (err){
          res.send(err);
          return;
        }
        res.json({ success: true });
      });
    });
  });
//Busca os membros da carona pelo ID da caronas
router.route('/lift/members/:carona_id')
  .get(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      }
      connection.query('SELECT * FROM membros_carona where id = ?',[req.params.carona_id], function(err, rows, fields) {
        connection.release();
        if (err){
          res.send(err);
          return;
        }
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
      connection.query('UPDATE membros_carona SET ? WHERE id = ? AND emailCaronista = ?',[{status: req.body.status}, req.params.carona_id, req.body.emailCaronista], function(err, rows, fields) {
        connection.release();
        if (err){
          res.send(err);
          return;
        }
        res.json({success: true});
      });
    });
  });


//Busca ID da carona pelo email do Caronista
router.route('/caronista/:user_email')
  .get(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      }
      connection.query('SELECT * FROM membros_carona where emailCaronista = ?',[req.params.user_email], function(err, rows, fields) {
        connection.release();
        if (err){
          res.send(err);
          return;
        }
        res.json(rows);
      });
    });
  });


//Busca as caronas dadas pelo Motorista
router.route('/lift/motorista/:email_motorista')
  .get(function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send(err);
        return;
      }

      connection.query('SELECT * FROM caronas where emailMotorista = ?',[req.params.email_motorista], function(err, rows, fields) {
        connection.release();
        if (err){
          res.send(err);
          return;
        }
        res.json(rows);
      });
    });
  });

//Busca a carona pelo ID
router.route('/lift/id/:carona_id')
    .get(function(req, res) {
      pool.getConnection(function(err, connection) {
        if (err) {
          res.send(err);
          return;
        }

        connection.query('SELECT * FROM caronas where id = ?',[req.params.carona_id], function(err, rows, fields) {
          connection.release();
          if (err){
            res.send(err);
            return;
          }
          res.json(rows);
        });
      });
    });

//Busca todas as caronas do banco
router.route('/lift')
    .get(function(req, res) {
      pool.getConnection(function(err, connection) {
        if (err) {
          res.send(err);
          return;
        }

        connection.query('SELECT * FROM caronas', function(err, rows, fields) {
          connection.release();
          if (err){
            res.send(err);
            return;
          }
          res.json(rows);
        });
      });
    })
    .post(function(req, res) {
      pool.getConnection(function(err, connection) {
        if (err) {
          res.send(err);
          return;
        }

        connection.query('INSERT INTO caronas SET ?', [req.body], function(err, rows, fields) {
          connection.release();
          if (err){
            res.send(err);
            return;
          }
          res.json({success: true});
        });
      });
    });

//notificações
router.route('/notifications/:user_email')
  .get(function(req, res) {
    mongoPool.collection('notifications').find({ email: req.params.user_email }).toArray((err, result) => {
      if(err) {
        res.send(err);
        return;
      }
      res.send(result);
    });
  });

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

      if ( result.subscription === undefined ) {
        res.send({message: 'User not subscribed.'});
        return;
      }

      var options = {};

      mongoPool.collection('notifications').insertOne(
        {
          email: req.params.user_email,
          message: req.body.message,
          emailRemetente: req.body.emailRemetente,
          imgRemetente: req.body.imgRemetente,
          idCarona: req.body.idCarona
        }
      )

      webPush.sendNotification(
        result.subscription, //subscription object
        JSON.stringify({
          img: req.body.imgRemetente,
          msg: req.body.message
        }), //payload
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

// Socket I/O Chat

var io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
  socket.emit('connected');
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', (room) => {
      socket.join(room);
      socket.room = room;
  });
  // when the client emits 'new message', this listens and executes
  socket.on('new message', message => {
    // we tell the clients to execute 'new message'
    io.to(socket.room).emit('new message', {
      username: socket.username,
      message
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', username => {
    // we store the username in the socket session for this client
    socket.username = username;
    socket.emit('login');
    // echo globally (all clients) that a person has connected
    io.to(socket.room).emit('user joined', {
      username: socket.username
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    io.to(socket.room).emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    io.to(socket.room).emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    // echo globally that this client has left
    io.to(socket.room).emit('user left', {
      username: socket.username
    });
  });
});

httpsServer.listen(8443);
httpServer.listen(8080);

/*http.createServer(function (req, res) {
    res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
    res.end();
}).listen(80);*/

console.log("Servidor HTTP rodando na porta 8080.");
console.log("Servidor HTTPS rodando na porta 8443.");
