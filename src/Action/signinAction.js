import { api } from './api/api';
import { apiRequestPending, apiRequestComplete } from '../Action/helper.action';

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
  console.log("Action call")
  dispatch(apiRequestPending());
  return api.post('/signin', { ...body })
    .then(resp => {
      dispatch(apiRequestComplete());
      debugger
      dispatch(signinRequestSuccess(resp.message))
      return Promise.resolve(resp.message)
    })
    .catch(error => {
      console.log(error)
      dispatch(apiRequestComplete());
      debugger
      dispatch(signinRequestFailure(error.error))
      return Promise.reject(error.error);
    })
};

