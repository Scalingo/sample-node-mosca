var mosca = require('mosca');

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: process.env.MONGO_URL || 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'mqtt',
  mongo: {}
};

var settings = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 1883,
  backend: ascoltatore
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published topic:', packet.topic, ' payload: ', packet.payload.toString());
});

server.on('ready', setup);

function setup() {
  console.log('Mosca server is up and running');
}
