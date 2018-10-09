// Third party modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Local modules
const config = require('../config/config.js')
const EndpointHandler = require('./endpoints/EndpointHandler.js');
// const model = require('./database/models.js');
const DatabaseHandler = require('./database/DatabaseHandler.js');

// ~~~~~ VAR/CONST INITILIZATION ~~~~~ //
const port = config.port;
const basePath = config.basePath;
const mongoDB = `${config.hostname}${config.dbName}`;


// ********** EXPRESS SERVER CONFIG ********** //
const app = express();
app.use(bodyParser.json())

// ********** DATABASE CONFIG ********** //
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise; // Get Mongoose to use the global promise library

const conn = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.once('open', () => {
  // ********** EXPRESS ENDPOINTS SETUP LOOP ********** //
  for(let obj of config.endpoints)
  {
    var path = `${basePath}${obj.relPath}`;
    var model = require(`../config/models/${obj.model}`);
    const databaseHandler = new DatabaseHandler(conn, model);

    // ~~~~~ ENDPOINT HANDLER OBJECTS ~~~~~ //
    let endpointHandler = new EndpointHandler(databaseHandler);

    // ~~~~~ ENDPOINTS CONNECTINS ~~~~~ //
    if (obj.methods.includes("GET")){app.get(path, (req, res) => endpointHandler.get(req, res))};
    if (obj.methods.includes("POST")){app.post(path, (req, res) => endpointHandler.post(req, res))};
    if (obj.methods.includes("DELETE")){app.delete(path, (req, res) => endpointHandler.delete(req, res))};
  }

  app.listen(port, () => console.log(`Express app running on http://localhost:${port}`))
})
