import {
    SUCCESS_ALERT,
    FAILURE_ALERT,
    CLEAR_BOTH_ALERT,
  } from '../Action/alert.action'
  
  const initialState = {
    message: '',
    error: '',
  }
  const alert = (state = initialState, action) => {
    debugger
    switch (action.type) {
      case SUCCESS_ALERT:
        return {
          ...state,
          message: action.message,
          error: '',
        }
      case FAILURE_ALERT:
        return {
          ...state,
          error: action.error,
          message: '',
        }
      case CLEAR_BOTH_ALERT:
        return {
          ...state,
          error: '',
          message: '',
        }
      default:
        return state;
    }
  }
  export default alert;
