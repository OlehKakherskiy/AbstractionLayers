var http = require('http');
var processRequest = require('./requestProcessor');

http.createServer(function (req, res) {
  processRequest(req,res);
}).listen(80);
