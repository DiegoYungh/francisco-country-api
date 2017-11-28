const express        = require('express');

// const MongoClient    = require('mongodb').MongoClient;
const mysql = require('mysql');

const bodyParser = require('body-parser');

const db = require('./config/db');

const app = express();

const port = 8000;

const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

const connection = mysql.createConnection(db);

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  require('./app/routes')(app, connection);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
