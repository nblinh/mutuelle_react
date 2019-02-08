import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//if (process.env.REACT_APP_STANDALONE) {
    const registerServiceWorker = require('./registerServiceWorker').default;
    ReactDOM.render(<App />, document.getElementById('root'));

    registerServiceWorker();
// } else {
//     global.bootstrapIrma = element => {
//         ReactDOM.render(<App />, element);
//     };
// }
