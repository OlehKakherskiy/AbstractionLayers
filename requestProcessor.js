"use strict";
var filterMapper = require('./filterMapper');
var formatResult = require('./replyResult');
var findRouteService = require('./findRouteService');
var cacher = require('./requestCache.js');

var processRequest = function(req, res){

	//находим все фильтры, которые отвечают за данный маршрут
	var filterList = filterMapper(req.url);

	console.log(filterList.length);
	//вызываем функцию doBeforeRequestProcessing фильтра
	filterList.forEach(function(filter){
		filter.doBeforeRequestProcessing(req, res);
	});

	var resultPromise = undefined;
	console.log("поиск в кеше");
	var cacheResult = cacher.findInCache(req);
	if(cacheResult !== undefined){
		console.log("ответ взят с кеша");
		resultPromise = new Promise(function(resolve){resolve(cacheResult)});
	}
	else{
		//ищем обработчик, отвечающий за данный путь
		var routeResult = findRouteService(req);
		//если получена функция-обработчик, то выполняется её вызов
		console.log('поиск функции-обработчика');
		console.log(typeof(routeResult) === 'function');
		if(typeof(routeResult) === 'function'){
			resultPromise = routeResult(req, res);
			
			//кеширование ответа на запрос
			resultPromise.then(function(reqResult){
				console.log("cохраняем ответ запроса "+req.url+" в кеш. Ответ: "+JSON.stringify(reqResult));
				cacher.saveInCache(req, reqResult);
			});
		}
		else{
			//обработка ошибки - нет обработчика такого пути. вывод в ответ запроса ошибки.
			resultPromise = new Promise(function(resolve, reject){reject(routeResult)}); 
		}
	}

	//подключаем фильтры к промису в обратном порядке. При нормальном выполнении промиса
	//вызывается onOK фильтра, при ошибке - onError
	for(let i = filterList.length - 1; i >= 0; i--){
		resultPromise.then(
			function(reqResult){
				console.log('Обработка '+ i+' фильтром');
				filterList[i].onOk(req, res, reqResult);
			},
			function(error){
				console.log('Обработка ошибки'+ i+' фильтром');
				filterList[i].onError(req, res, reqResult);
			});
	}


	//формирование http ответа после получения результата промиса 
	resultPromise.then(
		function(reqResult){
			console.log('формируем ответ (норм)')
			formatResult(res, reqResult);
		},
		function(errorResult){
			console.log('формируем ответ (ошибка)')
			formatResult(res, errorResult);
		});
}

module.exports = processRequest;