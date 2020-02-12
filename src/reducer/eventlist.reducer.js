import { EVENTS_REQUEST_SUCCESS, EVENTS_REQUEST_FAILURE} from '../action/events.action';
  
  const initialState = {
    name:'',
    date: '',
    time:'',
    place:'',
    eventslist:[]
  }

  const eventlist = (state = initialState, action) => {
    switch(action.type){
        case EVENTS_REQUEST_SUCCESS:
            return{
                ...state,
                pending: false,
                eventslist:action.resp
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
  export default eventlist

  