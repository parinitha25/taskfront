// import React from 'react';
import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import userComponents from './Components/signupComponents';
import signinComponent from './Components/signinComponent';
import homeComponent from './Components/homeComponent';
import './interceptor';
import {
  Alert,
  
} from 'reactstrap';

const AlertWrapper = ({ message, error }) => {
  if (message) {
    return <Alert className='text-center mb-0' >{message}</Alert>
  } else if (error) {
    return <Alert className='text-center mb-0' color='danger'>{error}</Alert>
  } else {
    return '';
  }
}

class App extends Component {

  render() {
    const { error, message} = this.props;
    return (
      <Fragment>
        {(message || error) && <AlertWrapper message={message} error={error} />}
       <Router>
       <Switch>     
       <Route exact path='/' component={userComponents}></Route>
       <Route exact path='/login' component={signinComponent}></Route>
       <Route exact path='/home' component={homeComponent}></Route>
       </Switch>
       </Router>

      </Fragment>
    );
  }
};

const mapStateToProps = state => {
  console.log('this: ', this);
  console.log('mapStateToProps / app.js', state);
  const { message, error } = state.alert;
  const { pending } = state.helper;
  return { message, error, pending };
}


export default connect(mapStateToProps, null)(App);
