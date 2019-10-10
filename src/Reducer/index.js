import {combineReducers}from 'redux';
import { reducer as formReducer } from 'redux-form'
import userReducer from './userReducer';
import helper from './helper.reducer';
import alert from './alert.reducer';
import signinReducer from './signinReducer';


export default combineReducers({
     
     form: formReducer,
     userReducer,
     helper,
     alert,
     signinReducer
   
});

