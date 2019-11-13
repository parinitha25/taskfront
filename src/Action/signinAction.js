import { api } from './api/api';
import { apiRequestPending, apiRequestComplete } from '../Action/helper.action';

export const SIGNIN_REQUEST_SUCCESS = 'SIGNIN_REQUEST_SUCCESS';
export const SIGNIN_REQUEST_FAILURE = 'SIGNIN_REQUEST_FAILURE';
export const TOKEN_EMAIL_TO_STORE = 'TOKEN_EMAIL_TO_STORE';
  

const signinRequestSuccess = (resp) => (
  {
    type: SIGNIN_REQUEST_SUCCESS,
    resp
  });

const signinRequestFailure = (error) => (
  {
    type: SIGNIN_REQUEST_FAILURE,
    error
  });

  export const storeEmailToken = () => ({
    type: TOKEN_EMAIL_TO_STORE
  })
  
export const signin = body => (dispatch) => {
  dispatch(apiRequestPending());
  return api.post('/signin', { ...body })
    .then(resp => {
      sessionStorage.setItem('token', resp.token);
      sessionStorage.setItem('email', resp.email);
      dispatch(apiRequestComplete());
      dispatch(signinRequestSuccess(resp.message))
      return Promise.resolve(resp.message)
    })
    .catch(error => {
      dispatch(apiRequestComplete());
      dispatch(signinRequestFailure(error.error))
      return Promise.reject(error.error);
    })
};

export const eventlist = body => (dispatch) => {
  dispatch(apiRequestPending());
  debugger
  return api.post('/posteventlist', { ...body })
    .then(resp => {
      sessionStorage.getItem('token', resp.token);
      dispatch(apiRequestComplete());
      dispatch(signinRequestSuccess(resp))
      return Promise.resolve(resp)
    })
    .catch(error => {
        debugger
      dispatch(apiRequestComplete());
      dispatch(signinRequestFailure(error))
      return Promise.reject(error);
    })
};







