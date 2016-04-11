var index = {
	'GET': function(req){
    return new Promise(function(resolve, reject){
      console.log('in index controller GET');
      var result = {};
      result.headers = {
        'Set-Cookie': 'mycookie=test',
        'Content-Type': 'text/html'
      };
        result.statusCode = 200;
        result.data = '<h1>Welcome</h1>Your IP: ' + req.connection.remoteAddress +
        '\n<pre>' + JSON.stringify(req.cookies) + '</pre>';
        console.log('начальный результат: '+JSON.stringify(result));
        resolve(result);
    });
	}
};

module.exports = index;