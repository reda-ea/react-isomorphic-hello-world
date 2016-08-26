
// main application component, will be mounted at the #react-root div

import React from 'react';

export default props =>
    <span>Hello {props.name || 'world'}</span>;

