import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import {getallsignin,getsignin,validateuser } from '../Action/signinAction';
import {connect} from 'react-redux';
import { compose } from 'redux';
import {    successAlertHandler,failureAlertHandler} from '../Action/alert.action';
import '../CSS/signupComponent.css';


class homeComponent extends Component {
    constructor(props){
      super(props);
      this.state = {
      User:[],
      token:""
      }
    } 
    debugger
    getallsignin=() => { 
      const{getallsignin,successAlertHandler,failureAlertHandler}=this.props
      const { history } = this.props;
      getallsignin() 
        .then(resp=>{
          successAlertHandler(resp);
          sessionStorage.removeItem("token")
          history.push('/');
        })
        .catch(error => {
        failureAlertHandler(error);
        sessionStorage.removeItem("token")
      })    
    }  
   
componentDidMount = async () => {
  const{getsignin,failureAlertHandler}=this.props
    getsignin() 
      .then(resp=>{
        this.setState({User:resp})
      })
      .catch(error => {
      failureAlertHandler(error);
    })  
    
}
componentWillMount = async () => {
  const{validateuser,successAlertHandler,failureAlertHandler}=this.props
   validateuser() 
  .then(resp=>{
    successAlertHandler(resp);
  })
  .catch(error => {
  failureAlertHandler(error);
    sessionStorage.removeItem("token")
})  
}
   
  render() {
    const { handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit(this.getallsignin)}>
        <button className="logout" onSubmit={this.logout}>Logout</button> 
                 <img src="/website.jpg" alt="image111" className="homeimage" />
               
                 {this.state.User.map((resp, index) => (
                    <h3 key={resp._id}>name:{resp.username},email:{resp.email}</h3>
                  ) )}       
                 
      </form> 
    )
  }
}

const mapStateToProps=(state)=>{
  const{token}=state.signinReducer; 
  return{token};
  
};

const actions = {
  getallsignin,
  getsignin,
  validateuser,
  successAlertHandler,
  failureAlertHandler
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'syncValidation',
  })) (homeComponent)