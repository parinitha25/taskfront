import { SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE } from '../Action/signupAction';
  
const initialState = {
  username:'',
  email: '',
  password:'',
  phone:'',
  gender:''
}
  
  const signup = (state = initialState, action) => {
    debugger
    switch(action.type){
      case SIGNIN_REQUEST_SUCCESS:
      return{
        ...state,
        pending: false,
      }
      case SIGNIN_REQUEST_FAILURE:
      return{
        ...state,
        pending: false,
      }
      default:
      return state
    }
  }
  export default signup