import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userReducer from './user';
import planetsReducer from './planets';
import searchReducer from './search';

export default combineReducers({
  router: routerReducer,
  user: userReducer,
  planets: planetsReducer,
  search: searchReducer
});