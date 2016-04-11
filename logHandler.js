var AbstractRequestFilter  = require('./abstractRequestFilter');

//логирование запросов и результатов запросов
var logHandler = new AbstractRequestFilter(function(req,res){
	console.log('логируем запрос');
  	var date = new Date().toISOString();
  	console.log([date, req.method, req.url].join('  '));
}, function(req, res, reqResult){
	console.log('логируем ответ');
	var date = new Date().toISOString();
	console.log([date, req.method, req.url, reqResult].join(' '));
}, undefined);

module.exports = logHandler;
console.log(logHandler);