import { api } from './api/api';
import { apiRequestPending,apiRequestComplete } from './helper.action';
export const SIGNIN_REQUEST_SUCCESS = 'SIGNIN_REQUEST_SUCCESS';
export const SIGNIN_REQUEST_FAILURE = 'SIGNIN_REQUEST_FAILURE';
  

const signinRequestSuccess = resp => (
  {
    type: SIGNIN_REQUEST_SUCCESS,
    resp
  });

const signinRequestFailure = error => (
  {
    type: SIGNIN_REQUEST_FAILURE,
    error
  });
  
export const signup = body => (dispatch) => {
  dispatch(apiRequestPending());
  return api.post('/signup', { ...body })
    .then(resp => {
      dispatch(apiRequestComplete());
      return Promise.resolve(dispatch(signinRequestSuccess(resp.message)))
    })
    .catch(error => {
      dispatch(apiRequestComplete());
      return Promise.reject(dispatch(signinRequestFailure(error.error)));
    })
};
