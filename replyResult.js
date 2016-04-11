var replyResult =  function(res, reqResult){
	console.log('пишем результат');
	res.writeHead(reqResult.statusCode, reqResult.headers);
	res.end(types[reqResult.headers['Content-Type']](reqResult.data));
	return reqResult;
};

var types = {
  'application/json': function(o) { return JSON.stringify(o); },
  'text/plain': function(s) { return s; },
  'text/html' : function(s) { return s; }
};

module.exports = replyResult;