import { SIGNUP_REQUEST_SUCCESS, SIGNUP_REQUEST_FAILURE } from '../action/signup.action';

const initialState = {
  username:'',
  email: '',
  password:'',
  phone:'',
  gender:''
}
 
  const signup = (state = initialState, action) => {
    switch(action.type){
      case SIGNUP_REQUEST_SUCCESS:
      return{
        ...state,
        pending: false,
      }
      case SIGNUP_REQUEST_FAILURE:
      return{
        ...state,
        pending: false,
      }
      default:
      return state
    }
  }
  export default signup