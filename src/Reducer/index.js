import {combineReducers}from 'redux';
import { reducer as formReducer } from 'redux-form'
import signupReducer from './signupReducer';
import helper from './helperreducer';
import alert from './alertreducer';
import signinReducer from './signinReducer';

export default combineReducers({
    form: formReducer,
    signupReducer,
    helper,
    alert,
    signinReducer   
});

