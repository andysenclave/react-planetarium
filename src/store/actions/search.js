import axios from 'axios';
import { 
  SEARCH_PLANETS_START,
  SEARCH_PLANETS_SUCCESS,
  RESET_SEARCH_COUNT 
} from './action.types';

import { config } from '../../config/app.config';
import { updatePlanets } from './planets';

const { planetsUri, searchLimit } = config;

export const searchPlanets = (name) => {
  console.log('its coming here too?');
  const resource = `${planetsUri}?search=${name}`;

  return async (dispatch, getState) => {
    console.log('inside dispatch')
    let planets = [];
    let searchOptions = getState().search;
    let { masterAccess } = getState().user;
    let searchLimit = getState().search.limit;
    console.log('searchOptions dispatch', searchOptions)    
    if(searchOptions.searchPending === false) {
      try {
        const searchCount = getState().search.count + 1;
        if(searchCount <= searchLimit || masterAccess) {
          console.log('searching', searchCount, searchLimit);
          const response = await axios.get(resource);
          planets = await response.data.results;
          console.log('planets are here', planets);
          if(planets.constructor === Array) {
            let updatedPlanets = await dispatch(updatePlanets(planets));
            // updatedPlanets();
            const searchRestricted = !getState().user.masterAccess;   
            searchOptions = Object.assign({}, searchOptions, {
              limit: searchLimit, //contain search limit for restricted users
              count: searchCount,  //count of searches within a 1 minute,
              limitReached: false,
              searchPending: false,
            });
          } else {
            searchOptions = Object.assign({}, searchOptions, {
              limitReached: true,
              searchPending: false
            });
          }
        }
      } catch (e) {
        console.error("something went wrong : ", e);
      } finally {
        console.log('inside finally', searchOptions);
        dispatch({
          type: SEARCH_PLANETS_SUCCESS,
          payload: searchOptions
        });
      }
    }
  };
}

export const startTimer = () => (dispatch) => {
  dispatch({
    type: SEARCH_PLANETS_START,
  });
  dispatch(resetTimer());
}
export const resetTimer = () => (dispatch) => {
  dispatch({
    type: RESET_SEARCH_COUNT
  });
};