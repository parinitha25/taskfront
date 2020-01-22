import { SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE} from '../action/home.action';
  
const initialState = {
  name:'',
  date: '',
  time:'',
  place:''
}
  
  const eventlist = (state = initialState, action) => {
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
  export default eventlist

  