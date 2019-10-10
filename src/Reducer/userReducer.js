import {
  SIGNIN_REQUEST_SUCCESS,
  SIGNIN_REQUEST_FAILURE
} from '../Action/userAction';

  
const initialState = {
  username:'',
  email: '',
  password:'',
  phone:'',
  gender:''
}

  
const signIn = (state = initialState, action) => {
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

export default signIn