import {combineReducers}from 'redux';
import { reducer as formReducer } from 'redux-form'
import signupReducer from './signup.reducer';
import helper from './helper.reducer';
import alert from './alert.reducer';
import signinReducer from './signin.reducer';
import eventsReducer from './events.reducer';
import eventlistReducer from './eventlist.reducer';
import userReducer from './user.reducer';


export default combineReducers({
    form: formReducer,
    signupReducer,
    helper,
    alert,
    signinReducer,
    eventsReducer,
    eventlistReducer,
    userReducer 
});

