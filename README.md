# react-isomorphic-hello-world
Simplest isomorphic web app example with ES6 style react using webpack/babel

### What this is

This is intended to be the simplest possible React isomorphic rendering example. This is intended as a learning point, not as an actual production grade application or template/architecture.

Everything is stripped down to the bare minimum, in order to focus only on the essential parts: 

* The application will only render a simple web page with a "Hello World" message.
* Webpack is used to compile/translate ES6 style React code using Babel.
* The code is compiled in memory and immediately sent to the client, as such there is no separate build process or dev server or any complication of that sort.
* Also, no redux, no express, etc. nothing other than the actually relevant tools.

### How it works

The application is divided into 6 files, all files are very simple and commented in detail. They can essentially be split into 3 categories:

#### server code

This is the code that does most of the heavy lifting, and is what we are mostly interested in (each file exports a single function):

* **http.js**: this is the actual http server, just a standard node server that runs the provided handler, and returns a 500 on error, an html response on success (and ignores the favicon request).
* **webpack.js**: this function takes the name of a `.jsx` file, and returns its compiled code (along with any imported files) as a string. The function itself contains the actual webpack configuration.
* **react.js**: this function is essentially the template for the returned HTML page. it requires the compiled client code, and the code of the root app component, and returns the full HTML content. *This is where the isomorphic rendering happens*.

#### application/client code

This is the code that will eventually be served to the users:

* **app.jsx**: this is the root application component, will be rendered isomorphically, then remounted on the client side. Any other used components will be included from here (essentially the rest of the application).
* **client.jsx**: this is the code that will be run on the client side, it will import the `app.js` file (and remount it), as well as any other client only code (or non react code).

#### the index file

**index.js** simply combines all of these files together, it runs the `http` server, on each request triggers `webpack` to compile both the `app` and `client` resources, and uses the compiled code with the `react` template to generate the HTML content (to be sent as a response).

### Where to go next

I highly recommend fully understanding every step of this example (to the point of being able to recreate the entire thing from scratch).

On an actual production environment, much better templates and bootstraps exist, that not only offer more features (actual web server/routing, hot reloadingwithout affecting the state, etc), more performance (caching the compiled resources, generating production ready bundle files, etc), but are also better maintained and documented/supported.

As for further learning, integrating redux to this example (with initial state applied on server side render) would be an interesting exercise.

*I will link to more resources in this section when I get the time...*
