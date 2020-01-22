import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import signup from './component/signup';
import signin from './component/signin';
import events from './component/events';
import admin from './component/admin';
import './interceptor';
import { Alert } from 'reactstrap';

debugger
const AlertWrapper = ({ message, error }) => {
  if (message) {
    return <Alert className='text-center mb-0' >{message}</Alert>
  } else if (error) {
    return <Alert className='text-center mb-0' color='danger'>{error}</Alert>
  } else {
    return '';
  }
}
const PrivateRoute = ({ component: IncomingComponent, ...rest }) => (
  <Route
  {...rest}
  render={props => (  
    (sessionStorage.getItem('token')) ? (<IncomingComponent {...props} />) : (
      <Redirect to={{pathname: '/', state: { from: props.location }, }}/>)
  )}
/>
);

class App extends Component {
  
  render() {
    const { error, message} = this.props;
    return (
      <Fragment>
        {(message || error) && <AlertWrapper message={message} error={error} />}  
       <Router>
       <Switch>     
       <Route exact path='/signup' component={signup}></Route>
       <Route exact path='/' component={signin}></Route>
       <PrivateRoute exact path='/home' component={events} />  
       <Route exact path='/admin' component={admin} />  
       </Switch>
       </Router>
      </Fragment>
    );
  }
};

const mapStateToProps = state => {
  const { message, error } = state.alert;
  const { pending } = state.helper;
  return { message, error, pending };
}


export default connect(mapStateToProps, null)(App);
