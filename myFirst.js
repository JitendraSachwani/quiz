var http = require('http');
// analogy with imports from py
var mod = require('./myFirstModule');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var x = ''+mod.myDateTime();
    for(var i = 0; i < 10; i++)
        x = x +'<br>'+ i;
    res.end(x);
}).listen(8080);

console.log("Server Started");

