import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';

import routes from './router/routes';
import routerOptions from './router/options';
import * as reducers from './reducers';
import * as middlewares from './middleware';

// Setup Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const customMiddleware = Object.values(middlewares);

const history = createHistory();

const {
    reducer: locationReducer,
    middleware: locationMiddleware,
    enhancer: locationEnhancer,
} = connectRoutes(history, routes, routerOptions);

const middleware = applyMiddleware(locationMiddleware, ...customMiddleware);

const store = createStore(
    combineReducers({ location: locationReducer, ...reducers }),
    composeEnhancers(locationEnhancer, middleware)
);

export default store;
