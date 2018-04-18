import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userReducer from './user';
import planetsReducer from './planets';

export default combineReducers({
  router: routerReducer,
  user: userReducer,
  planets: planetsReducer
});