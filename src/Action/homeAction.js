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

const deleteContactsucess = (resp) => (
  {
    type:DELETE_CONTACT_SUCESS,
    resp
  });

const deleteContactfailure = (error) => (
  {
      type:DELETE_CONTACT_FAILURE,
      error
  });
  
  export const validateuser = body => (dispatch) => {
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

  export const logout = body => (dispatch) => {
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
   
  export const getalluser = body => (dispatch) => {
    dispatch(apiRequestPending());
    return api.get('/getalluser', { ...body })
      .then(resp => {
        debugger
        dispatch(apiRequestComplete());
        dispatch(signinRequestSuccess(resp))
        return Promise.resolve(resp)
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(signinRequestFailure(error))
        return Promise.reject(error);
      })
      })
  }

  export const posteventlist = body => (dispatch) => {
    dispatch(apiRequestPending());
    return api.post('/posteventlist', { ...body })
      .then(resp => {
        sessionStorage.getItem('token', resp.token);
        dispatch(apiRequestComplete());
        dispatch(signinRequestSuccess(resp))
        return Promise.resolve(resp)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(signinRequestFailure(error))
        return Promise.reject(error);
      })
  };

  export const geteventlist = body => (dispatch) => {
    dispatch(apiRequestPending());
    return api.get('/geteventlist', { ...body })
      .then(resp => {
        dispatch(apiRequestComplete());
        dispatch(signinRequestSuccess(resp))
        return Promise.resolve(resp)
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(signinRequestFailure(error))
        return Promise.reject(error);
      })
      })
  }

  export const deleteContactlist = _id => (dispatch) => {
    dispatch(apiRequestPending());
    return api.delete(`/deleteeventlist/${_id}`)
      .then(resp => {
        dispatch(apiRequestComplete());
        dispatch(deleteContactsucess(resp.messagedelete))
        return Promise.resolve(resp.messagedelete)
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(deleteContactfailure(error))
        return Promise.reject(error);
      })
      })
  }
   
  export const update = (body,_id) => (dispatch) => {
    dispatch(apiRequestPending());
    return api.put(`/updateeventlist/${_id}`,{...body})
      .then(resp => {
        dispatch(apiRequestComplete());
        dispatch(signinRequestSuccess(resp))
        return Promise.resolve(resp)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(signinRequestFailure(error))
        return Promise.reject(error);
      })
  };
  
