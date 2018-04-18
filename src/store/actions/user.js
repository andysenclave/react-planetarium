import { SEARCH_PLANETS } from './action.types';

const planetsUri = '/api/planets';

export const searchPlanets = () => dispatch => {
  return fetch(productListUri)
    .then(res => res.json())
    .then(products => dispatch({type: GET_PRODUCTS, payload: products}))
}

export const showProducts = (id) => (dispatch, getState) => {
  console.log(getState(), 'sup?');
  return {
    type: SHOW_PRODUCTS
  };
}

export const findProduct = (id) => (dispatch, getState) => {
  const { products } = getState();
  const matchedItem = products.list.find(product => (product._id === id ? product : null));
  
  return dispatch({
    type: FIND_PRODUCT,
    payload: matchedItem
  });
}