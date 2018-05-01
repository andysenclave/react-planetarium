import { USER_LOGIN, USER_LOGOUT } from '../actions/action.types';

const initialState = {
  name: null,
  masterAccess: false,
  loggedIn: false
};

const userReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case USER_LOGIN:
      return payload;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;
