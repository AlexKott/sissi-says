import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import routes from './router/routes';
import routerOptions from './router/options';
import * as reducers from './reducers';
import * as middlewares from './middleware';
// not exported with other middlewares to make sure gatherRequestData middleware is executed first
import gatherRequestDataMiddleware from '@/middleware/gatherRequestData';

// Setup Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const customMiddleware = Object.values(middlewares);

const history = createHistory();

const {
    reducer: locationReducer,
    middleware: locationMiddleware,
    enhancer: locationEnhancer,
} = connectRoutes(history, routes, routerOptions);

const middleware = applyMiddleware(
  locationMiddleware,
  thunk,
  gatherRequestDataMiddleware,
  ...customMiddleware,
);

const store = createStore(
    combineReducers({ location: locationReducer, form: formReducer, ...reducers }),
    composeEnhancers(locationEnhancer, middleware)
);

export default store;
