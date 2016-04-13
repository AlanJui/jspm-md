var express = require('express');
var port = 20080;

var server = express();

server.use(express.static(__dirname + '/../client'));
server.listen(port, function () {
  console.log('Server listening at localhost:' + port + '/');
});


