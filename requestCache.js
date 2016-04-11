var AbstractRequestFilter  = require('./abstractRequestFilter');
var cache = [];

var requestCache = {

	findInCache: function(req){
		return req.method === "GET" ? cache[req.url] : undefined;
	},

	saveInCache: function(req, reqResult){
		cache[req.url] = reqResult;
	}

};

module.exports = requestCache;