import { api } from './api/api';
import { apiRequestComplete } from './helper.action';

export const EVENTS_REQUEST_SUCCESS = 'EVENTS_REQUEST_SUCCESS';
export const EVENTS_REQUEST_FAILURE = 'EVENTS_REQUEST_FAILURE';

const eventsRequestSuccess = (resp) => (
  {
    type: EVENTS_REQUEST_SUCCESS,
    resp
  });

const eventsRequestFailure = (error) => (
  {
    type: EVENTS_REQUEST_FAILURE,
    error
  });

  export const validateuser = body => (dispatch) => {
    return api.get('/validateuser', { ...body })
      .then(resp => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestSuccess(resp.message))
        return Promise.resolve(resp.message)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestFailure(error.error))
        return Promise.reject(error.error);
      })
  };

  export const logout = body => (dispatch) => {
    return api.post('/userlogout', { ...body })
      .then(resp => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestSuccess(resp.message))
        return Promise.resolve(resp.message)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestFailure(error.error))
        return Promise.reject(error.error);
      })
  };
   
  export const getalluser = body => (dispatch) => {
    return api.get('/getalluser', { ...body })
      .then(resp => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestSuccess(resp))
        return Promise.resolve(resp)
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestFailure(error))
        return Promise.reject(error);
      })
      })
  }

  export const posteventlist = body => (dispatch) => {
    return api.post('/posteventlist', { ...body })
      .then(resp => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestSuccess(resp.message))
        return Promise.resolve(resp.message)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestFailure(error))
        return Promise.resolve(error)
      })
  }

  export const geteventlist = body => (dispatch) => {
    return api.get('/geteventlist', { ...body })
      .then(resp => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestSuccess(resp))
        return Promise.resolve(resp)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestFailure(error))
        return Promise.reject(error);
      })  
  }

  export const deleteContactlist = _id => (dispatch) => {
    return api.delete(`/deleteeventlist/${_id}`)
      .then(resp => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestSuccess(resp.message))
        return Promise.resolve(resp.message)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestFailure(error))
        return Promise.reject(error); 
      })
  }
   
  export const update = (body,_id) => (dispatch) => {
    return api.put(`/updateeventlist/${_id}`,{...body})
      .then(resp => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestSuccess(resp.message))
        return Promise.resolve(resp.message)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestFailure(error))
        return Promise.reject(error);
      })
  };
  
