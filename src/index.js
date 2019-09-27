import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Reducer from './Reducer';

import ReduxThunk from 'redux-thunk'
	
import { Provider } from 'react-redux';	

import { createStore, applyMiddleware, compose } from 'redux';	
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducer , {}, composeEnhancers(applyMiddleware(ReduxThunk)));
	
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));	
serviceWorker.unregister();
