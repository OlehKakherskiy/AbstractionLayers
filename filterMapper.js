var logger = require("./logHandler.js");
var cookieParser = require('./parseCookies.js');

var routeFilterMap = {
	'/': [logger, cookieParser]
}

var getFilterList = function(reqURL){

	var filterList = [];

	var currentPart = '/';
	//добавляем все фильтры, которые висят на корне
	routeFilterMap['/'].forEach(function(filterName){filterList.push(filterName)});

	var routePaths = reqURL.split('/');
	routePaths = routePaths.slice(1,routePaths.length);
	console.log(routePaths);
	
	//исключение дублирования фильтров, когда путь - корень. Если путь - не корневой, то функция будет продолжать выполняться
	if(routePaths.length == 1 && routePaths[0] === '')
		return filterList;

	routePaths.forEach(function(part){
		currentPart += part.trim();
		console.log(currentPart);
		var filters = routeFilterMap[currentPart];
		if(filters !== undefined)
			filters.forEach(function(filterName){filterList.push(filterName)});
		currentPart += '/';
	});
	return filterList;
}

module.exports = getFilterList;