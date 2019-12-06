import { SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE,DELETE_CONTACT_SUCESS,DELETE_CONTACT_FAILURE} from '../Action/homeAction';
  
const initialState = {
  name:'',
  date: '',
  time:'',
  place:'',
  token:''
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
        case DELETE_CONTACT_SUCESS:
            // const Id = action.data;
            // return state.filter(resp=>action.id!==Id)
            return{
              ...state,
              pending: false,
          }
          case DELETE_CONTACT_FAILURE:
            return{
              ...state,
              pending: false,
          }
              default:
              return state
    }
  }
  export default eventlist

  