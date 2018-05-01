import { 
  SEARCH_PLANETS_START,
  SEARCH_PLANETS_SUCCESS,
  RESET_SEARCH_COUNT 
} from '../actions/action.types';
import { config } from '../../config/app.config';

const { searchLimit } = config;

const initialState = {
  limit: searchLimit, // contain search limit for restricted users
  count: 0,  // count of searches within 1 minute ,
  limitReached: true,
  searchTimerStarted: false,
  searchPending: false
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case SEARCH_PLANETS_SUCCESS:
      return payload;
    case SEARCH_PLANETS_START:
      return Object.assign({}, state, {
        searchTimerStarted: true
      });
    case RESET_SEARCH_COUNT:
      return Object.assign({}, state, {
        count: 0
      });
    default:
      return state;
  }
}

export default searchReducer;
