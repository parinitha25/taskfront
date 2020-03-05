import React, { Component } from 'react';
import '../css/Allcomponent.css';
import { connect } from 'react-redux';
import { successAlertHandler,failureAlertHandler } from '../action/alert.action';
import { invitatinguser } from '../action/signup.action';
import Cookies from 'js-cookie';

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      email:''
    }     
  } 
       
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  invitatinguser = () => { 
    const{invitatinguser,failureAlertHandler}=this.props
    const userMail = {
      email: this.state.email,
    }
    Cookies.set('mail', this.state.email);
    invitatinguser(userMail) 
      .then(resp=>{
        successAlertHandler(resp);    
      })
      .catch(error => {
        failureAlertHandler(error);
      })    
    }  

  render() {
    const { email} = this.state;
    return (       
      <div>
        <input type="text" value={email} name="email" onChange={this.handleChange} ></input>
        <button onClick={this.invitatinguser}>Submit</button>
      </div>
    );
  }
}

  const actions = {  
    successAlertHandler,
    failureAlertHandler,
    invitatinguser
  }
  
export default connect( null, actions)(Invite)