import { api } from './api/api';
import { apiRequestComplete } from './helper.action';

export const SIGNUP_REQUEST_SUCCESS = 'SIGNUP_REQUEST_SUCCESS';
export const SIGNUP_REQUEST_FAILURE = 'SIGNUP_REQUEST_FAILURE';
  

const signupRequestSuccess = resp => (
  {
    type: SIGNUP_REQUEST_SUCCESS,
    resp
  });

const signupRequestFailure = error => (
  {
    type: SIGNUP_REQUEST_FAILURE,
    error
  });
  
export const signup = body => (dispatch) => {
  return api.post('/signup', { ...body })
    .then(resp => {
      dispatch(apiRequestComplete());
      dispatch(signupRequestSuccess(resp))
      return Promise.resolve(resp)
    })
    .catch(error => {
      dispatch(apiRequestComplete());
      dispatch(signupRequestFailure(error))
      return Promise.reject(error);
    })
};

export const invitatinguser = body => (dispatch) => {    
  return api.post(`/postusermail`, { ...body})
    .then(resp => {
      dispatch(apiRequestComplete());
      dispatch(signupRequestSuccess(resp))
      return Promise.resolve(resp)
    })
    .catch(error => {
      dispatch(apiRequestComplete());
      dispatch(signupRequestFailure(error))
      return Promise.resolve(error)
    })
}

export const getinvite = (body)  => (dispatch) => {   
  return api.get('/getusermail' ,{ ...body})
    .then(resp => {
      dispatch(apiRequestComplete());
      dispatch(signupRequestSuccess(resp))
      return Promise.resolve(resp)
    })
    .catch(error => {
      dispatch(apiRequestComplete());
      dispatch(signupRequestFailure(error))
      return Promise.reject(error);
    })  
}