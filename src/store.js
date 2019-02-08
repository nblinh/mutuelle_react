import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';

import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const devtoolsMiddleware = global.__REDUX_DEVTOOLS_EXTENSION__
    ? global.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;

const store = createStore(
    reducers,
    compose(
        ...[
            applyMiddleware(sagaMiddleware),
            process.env.NODE_ENV === 'development' ? persistState() : null,
            devtoolsMiddleware,
        ].filter(x => x),
    ),
);

sagaMiddleware.run(sagas);

export default store;
