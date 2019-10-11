import {
    SIGNIN_REQUEST_SUCCESS,
    SIGNIN_REQUEST_FAILURE
  } from '../Action/signinAction';
  
    
  const initialState = {
    email: '',
    password:'',
    message:''
  }
  
    
  const signIn = (state = initialState, action) => {
      debugger
    switch(action.type){
      case SIGNIN_REQUEST_SUCCESS:
      return{
        ...state,
        pending: false,
        message:action.resp
      }
      case SIGNIN_REQUEST_FAILURE:
      return{
        ...state,
        pending: false,
        // errormessage:action.error
    

      }
      default:
      return state
    }
  }
  
  export default signIn