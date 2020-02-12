import { api } from './api/api';
import { apiRequestComplete } from './helper.action';

export const SIGNIN_REQUEST_SUCCESS = 'SIGNIN_REQUEST_SUCCESS';
export const SIGNIN_REQUEST_FAILURE = 'SIGNIN_REQUEST_FAILURE';  

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

  export const signin = body => (dispatch) => {
    return api.post('/signin', { ...body })
      .then(resp => {
        sessionStorage.setItem('token', resp.token);
        sessionStorage.setItem('email', resp.email);
        dispatch(apiRequestComplete());
        dispatch(signinRequestSuccess(resp))
        return Promise.resolve(resp)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(signinRequestFailure(error.error))
        return Promise.reject(error.error);
      })
  };









