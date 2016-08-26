
var vm = require('vm');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

module.exports = function(client, app) {

    // run the app.jsx code in a context jail, and get the exported component
    var AppComponent = new vm.Script(app).runInNewContext().default;

    // return the html content of the page
    return '<html><head><script>' +
        // client.jsx is set to execute on page load (& remount the react app)
        'window.onload = function(){'+ client + ';}' +
    '</script></head><body><div id="react-root">' +
        // app.jsx is rendered from the server to the #react-root element
        ReactDOMServer.renderToString(React.createElement(AppComponent)) +
    '</div></body></html>';
};
