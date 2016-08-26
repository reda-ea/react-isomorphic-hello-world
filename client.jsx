
// all code in this file will only be executed on the client side

import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

// remount the same root component that was rendered by the server
ReactDOM.render(<App/>, document.getElementById('react-root'));

// any other client side only code can be executed here
document.title = 'Hello isomorphic react world';
