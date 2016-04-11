var AbstractRequestFilter  = require('./abstractRequestFilter');

//Parsing cookies
var parseCookies = new AbstractRequestFilter(function(req,res){
	console.log("парсим куки");
    var cookie = req.headers.cookie,
    cookies = {};
    if (cookie) cookie.split(';').forEach(function(item) {
      var parts = item.split('=');
      cookies[(parts[0]).trim()] = (parts[1] || '').trim();
    });
    req.cookies = cookies; //в объект запроса вшивается новое поле с пропарсенными куками
},undefined, undefined);

module.exports = parseCookies;