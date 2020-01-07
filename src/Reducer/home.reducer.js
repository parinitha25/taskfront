import { SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE} from '../Action/home.action';
  
const initialState = {
  name:'',
  date: '',
  time:'',
  place:'',
  success:''
}
  
  const eventlist = (state = initialState, action) => {
    switch(action.type){
        case SIGNIN_REQUEST_SUCCESS:
            return{
                ...state,
                success: action.resp.messagedelete,
                // pending: false,
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
  export default eventlist

  