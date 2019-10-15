import{ API_REQUEST_PENDING, API_REQUEST_COMPLETE } from '../Action/helper.action'
  
  const initialState = {
    pending: false
  }
  
  const helper = (state = initialState, action) => {
    switch (action.type) {
      case API_REQUEST_PENDING:
      return {
        ...state,
        pending: true,
      }
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