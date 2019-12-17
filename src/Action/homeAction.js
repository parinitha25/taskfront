import { api } from './api/api';
import { apiRequestPending, apiRequestComplete } from '../Action/helper.action';

export const SIGNIN_REQUEST_SUCCESS = 'SIGNIN_REQUEST_SUCCESS';
export const SIGNIN_REQUEST_FAILURE = 'SIGNIN_REQUEST_FAILURE';
export const DELETE_CONTACT_SUCESS = 'DELETE_CONTACT_SUCESS';
export const DELETE_CONTACT_FAILURE = 'DELETE_CONTACT_FAILURE';
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

export const deleteContactsucess = (resp) => (
  {
        type:DELETE_CONTACT_SUCESS,
        resp
});

const deleteContactfailure = (error) => (
  {
      type:DELETE_CONTACT_FAILURE,
      error
  });


  export const storeEmailToken = () => ({
    type: TOKEN_EMAIL_TO_STORE
  })

  export const validateuser = body => (dispatch) => {
    debugger
    dispatch(apiRequestPending());
    return api.get('/validateuser', { ...body })
      .then(resp => {
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

  export const getallsignin = body => (dispatch) => {
    dispatch(apiRequestPending());
    return api.get('/getuserlogout', { ...body })
      .then(resp => {
        sessionStorage.setItem('email', resp.email);
        dispatch(apiRequestComplete());
        dispatch(signinRequestSuccess(resp.messagel))
        return Promise.resolve(resp.messagel)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(signinRequestFailure(error.errorl))
        return Promise.reject(error.errorl);
      })
  };
   
  export const getsignin = body => (dispatch) => {
    dispatch(apiRequestPending());
    return api.get('/getuserall', { ...body })
      .then(resp => {
        debugger
        dispatch(apiRequestComplete());
        dispatch(signinRequestSuccess(resp))
        return Promise.resolve(resp)
      .catch(error => {
        debugger
        dispatch(apiRequestComplete());
        dispatch(signinRequestFailure(error))
        return Promise.reject(error);
      })
      })
  }

  export const eventlists = body => (dispatch) => {
    dispatch(apiRequestPending());
    return api.get('/geteventlists', { ...body })
      .then(resp => {
        debugger
        dispatch(apiRequestComplete());
        dispatch(signinRequestSuccess(resp))
        return Promise.resolve(resp)
      .catch(error => {
        debugger
        dispatch(apiRequestComplete());
        dispatch(signinRequestFailure(error))
        return Promise.reject(error);
      })
      })
  }

  export const deleteContactlist = _id => (dispatch) => {
    dispatch(apiRequestPending());
    debugger
    return api.delete(`/deleteeventlist/${_id}`)
      .then(resp => {
        debugger
        dispatch(apiRequestComplete());
        dispatch(deleteContactsucess(resp.messagedelete))
        return Promise.resolve(resp.messagedelete)
      .catch(error => {
        debugger
        dispatch(apiRequestComplete());
        dispatch(deleteContactfailure(error))
        return Promise.reject(error);
      })
      })
  }
   
export const update = (body,_id) => (dispatch) => {
    dispatch(apiRequestPending());
    debugger
    return api.put(`/updateeventlist/${_id}`,{...body})
      .then(resp => {
        // sessionStorage.setItem('token', resp.token);
        // sessionStorage.setItem('email', resp.email);
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
  
