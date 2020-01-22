import{  API_REQUEST_COMPLETE } from '../action/helper.action'
  
  const initialState = {
    pending: false
  }
  
  const helper = (state = initialState, action) => {
    switch (action.type) {
      case API_REQUEST_COMPLETE:
      return {
        ...state,
        pending: false,
      }
      default:
      return state;
    }
  }
  export default helper;