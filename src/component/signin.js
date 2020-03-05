import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import {signin } from '../action/signin.action';
import {connect} from 'react-redux';
import { compose } from 'redux';
import {successAlertHandler,failureAlertHandler} from '../action/alert.action';
import '../css/Allcomponent.css';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9_.]+)([a-zA-Z]{2,5})$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }  else if (!/^[A-Z0-9@]{4,8}$/i.test(values.password)) {
    errors.password = 'Invalid password'
  }
  return errors
}
const renderField = ({
  input,
  label,
  type,
  value,
  className,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} value={value} className={className}/>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class signinComponent extends Component {
    constructor(props){
      super(props);
      this.state = {
        email:'',
        password:''
      }
    } 
    signin=(values) => { 
      const{signin,failureAlertHandler}=this.props
      const { history } = this.props;
      const userObj = {
        email: values.email,
        password:values.password,
      }
      signin(userObj) 
        .then(resp=>{
          if(resp.role==="Admin"){
            history.push('/admin');
          }
          else{
            history.push('/event');
          }
          
        })
        .catch(error => {
        failureAlertHandler(error);
      })    
    }  
    
   
  render() {
    const { handleSubmit, reset} = this.props
    const { email,password} = this.state;
    return (
      <form onSubmit={handleSubmit(this.signin)}>
        <h1 className='heading'>Login Form</h1>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <label className="lbl"><b>Email</b></label>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <Field name="email" type="email"  value={email} component={renderField}  className="input"  />
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        </div>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <label className="lbl"><b>Password</b></label>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <Field name="password" type="text"  value={password} component={renderField}  className="input" />
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        </div>
        <div className="row">
          <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <button type="submit" className='btn btn-success lbl'>
              <b>Submit</b>
            </button>
          </div>
          <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2'>
            <button type="button"  onClick={reset} className='btn btn-success clear'>
              <b>Clear Values</b>
            </button>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          </div>
        </div>   
      </form> 
      
    )
  }
}

const mapStateToProps=(state)=>{
  const{email,password}=state.signinReducer;
  return{email,password};  
};

const actions = {
  signin,
  successAlertHandler,
  failureAlertHandler
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'syncValidation',
      validate
  })) (signinComponent)