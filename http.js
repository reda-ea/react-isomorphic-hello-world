
var http = require('http');

// start a server on the given port
// handler(cb(err,body)) provides the response/error to a node style callback
module.exports = function(port, handler) {

    var server = http.createServer(function (request, response) {
        // ignore the /favicon.ico request (not relevant to this example)
        if (request.url === '/favicon.ico') {
            response.writeHead(200, {'Content-Type': 'image/x-icon'} );
            return response.end();
        }

        // handler is called on each request, which will recompile all assets
        handler(function(err, body) {
            if(err) {
                // reply with 500 if handler returns an error
                response.writeHead(500, {"Content-Type": "application/json"});
                return response.end(JSON.stringify(err, null, 2));
            }
            // send the response provided by the handler as HTML
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(body);
        });
    });

    // start the server
    server.listen(port);

    // return the created server (just in case)
    return server;
};
