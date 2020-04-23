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
      email:'',
      role:''
    }     
  } 
       
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
 
  invitatinguser = () => { 
    debugger
    const{invitatinguser,failureAlertHandler}=this.props
    const userMail = {
      email: this.state.email,
      role:this.state.role
    }
    Cookies.set('mail', this.state.email);
    Cookies.set('role', this.state.role);
    invitatinguser(userMail) 
      .then(resp=>{
        successAlertHandler(resp);    
      })
      .catch(error => {
        failureAlertHandler(error);
      })    
    }  

  render() {
    const { email,role} = this.state;
    return (       
      <div>
        <select value={role} name="role" onChange={this.handleChange} >
            <option></option>
            <option  value="admin">Admin</option>
            <option  value="user">User</option>
        </select>
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