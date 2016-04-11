var fs = require('fs');
var personService = {

	'GET': function(req){
        return new Promise(function(resolve, reject){
            console.log('in person controller GET');
            var result = {};
            console.log('зашел в функцию чтения с файла');
            fs.readFile('./person.json', function(err, data) {
                if (!err) {
                    var obj = JSON.parse(data);
                    obj.birth = new Date(obj.birth);
                    var difference = new Date() - obj.birth;
                    obj.age = Math.floor(difference / 31536000000);
                    delete obj.birth;
                    result.data = obj;
                    result.statusCode = 200;
                    result.headers = {'Content-Type':'application/json'};
                    resolve(result);
                } else {
                    console.log('error in person GET');
                    result.statusCode = 500;
                    result.headers = {'Content-Type':'text/plain'};
                    result.data = 'Read error';
                    reject(result);
                }
            });
        });
    },

    'POST': function(req){
        console.log('in person controller POST');
        return new Promise(function(resolve, reject){
            // Receiving POST data
            var data = "";
            var result = {};
            req.on('data', function(chunk) {
              data += chunk;
            }).on('end', function() {
              fs.writeFile('./person.json', data, function(err) {
                result.headers = {'Content-Type':'text/plain'};
                if (!err) {
                  result.statusCode = 200;
                  result.data = "File saved";
                  resolve(result);
                } else {
                  result.statusCode = 500;
                  result.data = "Write error";
                  reject(result);
                }
              });
            });
        });
    }
};

module.exports = personService;