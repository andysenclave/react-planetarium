import { UPDATE_PLANETS } from '../actions/action.types';
const initialState = [];

const planetsReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case UPDATE_PLANETS:
      return payload;
    default:
      return state;
  }
}

export default planetsReducer;
