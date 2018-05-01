import axios from 'axios';
import { USER_LOGIN, USER_LOGOUT } from './action.types';
import { config } from '../../config/app.config';

const { masterUser, peopleUri } = config;

export const loginUser = ({ username, password }) => {
  const resource = `${peopleUri}?search=${username}`;
  return async (dispatch, getState) => {
    let user = getState().user;
    let successLogin = false;

    try {
      const response = await axios.get(resource);
      let loginUser = await response.data.results;

      if(loginUser.constructor === Array) {
        const { name, birth_year,   } = loginUser[0];
        if(name === username && birth_year === password) {
          user = {
            name,
            masterAccess: name === masterUser,
            loggedIn: true
          };
          successLogin = true;
        }
      }
    } catch (e) {
      console.error("something went wrong : ", e);
    } finally {
      dispatch({
        type: USER_LOGIN,
        payload: user
      });
      return successLogin;
    }
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT
  });
}; 