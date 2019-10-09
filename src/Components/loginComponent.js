import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import {signin } from '../Action/userAction';
import {connect} from 'react-redux';
import { compose } from 'redux';
import {successAlertHandler,failureAlertHandler} from '../Action/alert.action';
import '../CSS/userComponent.css';


const validate = values => {
  
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
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
}) => {
  console.log('value', value)
  return <div>
    
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} value={value} className={className}/>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
}

  class loginComponent extends Component {
    constructor(props){
      super(props);
      this.resetvalue = this.resetvalue.bind(this);
      this.state = {
        email:'',
        password:'',
      }
    } 
   
  
render() {
  const { handleSubmit,pristine, reset, submitting} = this.props
  const { emai,password} = this.state;
  return (
    <form onSubmit={handleSubmit(this.signin)}>
      <h1 className='heading'>Login Form</h1>
      <div className="row">
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <label className="lbl">Email</label>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <Field name="email" className='input' component="input" value={email} type="text"  placeholder="email"/>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
      </div>
      <div className="row">
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <label className="lbl">Password</label>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <Field name="password" className='input' component="input" value={password}  type="password"  placeholder="Password"/>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
      </div>
      <div className="row">
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <button type="submit" disabled={submitting} className='lbl'>
            Submit
          </button>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <button type="button" disabled={pristine || submitting} onClick={reset} className='clear'>
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
  const{email}=state.userReducer; 
  const{password}=state.userReducer; 
  return{email,password};
};

const actions = {
  signin
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'syncValidation',
      validate
    })) (loginComponent) 