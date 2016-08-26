#!/usr/bin/env node

var server = require('./http');
var compile = require('./webpack');
var template = require('./react');

server(process.env.PORT || 8080, function(reply) {
    // 1. compile resources
    compile('client', function(err, client) {
        if(err)
            return reply(err);
        compile('app', function(err, app) {
            if(err)
                return reply(err);
            // now we have both compiled resources

            // 2. generate the html from template
            var htmlContent = template(client, app);

            // 3. send the full code to the client
            return reply(null, htmlContent);
        });
    });
});
