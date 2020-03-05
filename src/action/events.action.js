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
  
  export const posteventlist =(body,_id)=> (dispatch) => {    
    return api.post(`/postevent/${_id}`, { ...body})
      .then(resp => {
        sessionStorage.getItem('userId', resp.userId);
        dispatch(apiRequestComplete());
        dispatch(eventsRequestSuccess(resp))
        return Promise.resolve(resp)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestFailure(error))
        return Promise.resolve(error)
      })
  }

  export const geteventlist =(body) => (dispatch) => {    
    return api.get(`/getevents` ,{ ...body})
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

  export const deleteEvent = (_id,_id1) => (dispatch) => {
    debugger
    return api.delete(`/deleteevent/${_id}/${_id1}`)
      .then(resp => {
        dispatch(apiRequestComplete());
        sessionStorage.getItem('userId', resp.userId);
        dispatch(eventsRequestSuccess(resp.message))
        return Promise.resolve(resp.message)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestFailure(error))
        return Promise.reject(error); 
      })
  }
   
  export const updateEvent = (body,_id) => (dispatch) => {
    return api.put(`/updateevent/${_id}`,{...body})
      .then(resp => {
        dispatch(apiRequestComplete());
        // sessionStorage.getItem('userId', resp.userId);
        dispatch(eventsRequestSuccess(resp.message))
        return Promise.resolve(resp.message)
      })
      .catch(error => {
        dispatch(apiRequestComplete());
        dispatch(eventsRequestFailure(error))
        return Promise.reject(error);
      })
  };

  // export const postappt = body => (dispatch) => { 
  //   debugger   
  //   return api.post(`/appt`, { ...body})
  //     .then(resp => {
  //       dispatch(apiRequestComplete());
  //       dispatch(eventsRequestSuccess(resp))
  //       return Promise.resolve(resp)
  //     })
  //     .catch(error => {
  //       dispatch(apiRequestComplete());
  //       dispatch(eventsRequestFailure(error))
  //       return Promise.resolve(error)
  //     })
  // }

  
