import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import {signin } from '../Action/signinAction';
import {connect} from 'react-redux';
import { compose } from 'redux';
import {successAlertHandler,failureAlertHandler} from '../Action/alert.action';
import '../CSS/signupComponent.css';

const validate = values => {
  debugger
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)([a-zA-Z]{2,5})$/i.test(values.email)) {
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
      const{signin,successAlertHandler,failureAlertHandler}=this.props
      const { history } = this.props;
      const userObj = {
        email: values.email,
        password:values.password
      }
      console.log(userObj)
      signin(userObj) 
        .then(resp=>{
          successAlertHandler(resp);
          history.push('/home');
        })
        .catch(error => {
        failureAlertHandler(error);
        // console.log(error)
      })    
    }  
   
  render() {
    debugger
    const { handleSubmit, reset,} = this.props
    const { email,password} = this.state;
    return (
      <form onSubmit={handleSubmit(this.signin)}>
        <h1 className='heading'>Registration Form</h1>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <label className="lbl">Email</label>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <Field name="email" type="email"  value={email} component={renderField}  className="input"  />
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        </div>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <label className="lbl">Password</label>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <Field name="password" type="text"  value={password} component={renderField}  className="input" />
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        </div>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <button type="submit" className='lbl'>
              Submit
            </button>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <button type="button"  onClick={reset} className='clear'>
              Clear Values
            </button>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        </div>
      </form> 
    )
  }
}

const mapStateToProps=(state)=>{
  debugger
  const{email}=state.signinReducer; 
  const{password}=state.signinReducer;
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