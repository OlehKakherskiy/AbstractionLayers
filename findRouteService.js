var personService = require('./personService');
var index = require('./index');

var routing = {
  '/person': personService,
  '/':index
};

var findRouteService = function(req){
	console.log('ищем route сервис');
	var result = {};
	var route = routing[req.url];
	if (route === undefined || route[req.method] === undefined){
		result.statusCode = 404;
		result.headers = {'Content-Type':'text/plain'};
		result.data = 'path/method is not found';
		return result;
	}
	else return route[req.method];
};

module.exports = findRouteService;