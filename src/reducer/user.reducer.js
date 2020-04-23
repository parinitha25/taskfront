import { EVENTS_REQUEST_SUCCESS, EVENTS_REQUEST_FAILURE} from '../action/events.action';
  
  const initialState = {
    username:'',
    gender: '',
    email:'',
    password:'',
    phone:'',
    role:'',
    user:[],
    usercount:[]
  }
 
  const userlist = (state = initialState, action) => {
    switch(action.type){
        case EVENTS_REQUEST_SUCCESS:
            return{
                ...state,
                pending: false,
                user: [...state.user, ...action.resp[0].list],
                usercount:action.resp[0].metadata
            }
        case EVENTS_REQUEST_FAILURE:
            return{
                ...state,
                pending: false,
            }
        default:
            return state
    }
  }
  export default userlist

  