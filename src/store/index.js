import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';

export const history = createHistory();
const routerMiddleWare = routerMiddleware(history);

const middleWare = [routerMiddleWare, thunk];
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  withDevTools(applyMiddleware(...middleWare))
);