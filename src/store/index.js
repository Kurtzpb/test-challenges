import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';

import { default as createRootReducer } from './modules';

const initialState = {};
export const history = createBrowserHistory();

const loggerMiddleware = createLogger({});
const routerMiddleware = createRouterMiddleware(history);

const middlewares = [thunkMiddleware, routerMiddleware, loggerMiddleware];
const enhancer = composeWithDevTools({
  trace: true,
  traceLimit: 50
});

export const store = createStore(
  createRootReducer(history),
  initialState,
  enhancer(applyMiddleware(...middlewares))
);
