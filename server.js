const express = require('express')
const MongoClient = require('mongodb').MongoClient
const WebSocket = require('ws');
const http = require('http');
const MongoOplog = require('mongo-oplog')

const app = express()
const MQTTCollection = 'mqtt'
const MQTT_URL = process.env.TCP_URL || 'tcp://localhost:1883'


var port = process.env.PORT || 3000
var mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017/mqtt'
var db


app.set('view engine', 'jade')

// Init WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Express Methods
app.get('/', function (req, res) {
  db.collection(MQTTCollection).find().sort({"_id": -1}).limit(5).toArray(function(err, results) {
    res.render('index', {messages: results, mqtt_url: MQTT_URL})
  })
})

// Serve the assets directory
app.use('/assets', express.static('assets'));

// Websocket Methods

// Broadcast: Broadcast a message to every connected client.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


// Oplog: Tail the mqtt collection to receive the last messages
function startOplog(db) {
  db.collection('mqtt', function(err, collection){
    if (err) { return console.log(err) }
    console.log("=== open tailable cursor ===")
    collection.find({}, {tailable: true, awaitdata: true, numberOfRetries:-1})
      .each(function(err, doc){
        wss.broadcast(JSON.stringify({topic: doc.topic, value: doc.value.toString()}))
        console.log("New message topic: ",doc.topic, " value: ", doc.value.toString())
      })
  })
}

MongoClient.connect(mongo_url, (err, database) => {
  if (err) return console.log(err)
  db = database
  server.listen(port, function listening() {
    console.log('Listening on %d', server.address().port);
  });
  startOplog(db)
})
