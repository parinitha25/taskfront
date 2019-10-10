import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import {signup } from '../Action/userAction';
import {connect} from 'react-redux';
import { compose } from 'redux';
import {successAlertHandler,failureAlertHandler} from '../Action/alert.action';
import '../CSS/userComponent.css';


const validate = values => {

  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.phone) {
    debugger
    errors.phone = 'Required'
  } else if (!/^[0-9]{3}-\d{3}-\d{4}$/i.test(values.phone)) {
    debugger
   errors.phone = 'Invalid phone number'
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


  class userComponents extends Component {
    constructor(props){
      super(props);
      this.state = {
        username:'',
        email:'',
        password:'',
        phone:'',
        gender:''
      }
    } 
    signup=values => { 
      const{signup}=this.props
      const {username,email,password,phone,gender}=this.state;
      const { history } = this.props;
      const userObj = {
        username: values.username,
        email: values.email,
        password:values.password,
        phone:values.phone,
        gender:values.gender
      }
      console.log(userObj)
      signup(userObj) 
     .then(resp=>{
      successAlertHandler(resp.resp);
      history.push('./home');
      })
      .catch(error => {
      failureAlertHandler(error.error);
      })
    }

 
   
  
render() {
  const { handleSubmit, reset,} = this.props
  const { email,username,password,phone} = this.state;
  debugger
  // console.log('----->', email)
  // console.log('reset=>', reset)
  return (
    <form onSubmit={handleSubmit(this.signup)}>
      <h1 className='heading'>Registration Form</h1>
      <div className="row">
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <label className='lbl'>Username</label>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          {/* <Field name="username" className='input' component="input" value={username} type="text"  placeholder="User Name"/> */}
          <Field className='input' name="username" type="text" value={username} component={renderField} />
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
      </div>
      <div className="row">
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <label className="lbl">Email</label>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          {/* <Field name="email" className='input' component="input" value={email} type="text"  placeholder="email"/> */}
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
          {/* <Field name="password" className='input' component="input" value={password}  type="password"  placeholder="Password"/> */}
          <Field name="password" type="text"  value={password} component={renderField}  className="input" />
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
      </div>
      <div className="row">
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <label className="lbl">Mobile number</label>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          {/* <Field name="phone" type="number" className='input' value={phone} component="input"  placeholder="phone"/> */}
          <Field name="phone" type="text"  value={phone} component={renderField}  className="input"/>       
         </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
      </div>
      <div className="row">
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
          <label className="lbl">Gender</label>
        </div>
        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 row'>
          <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
          <label className='lbl'>
            <Field name="gender" component="input" type="radio" value="male" />{' '}
            Male
          </label>
          </div>
          <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
          <label className='lbl'>
            <Field name="gender" component="input" type="radio" value="female" />{' '}
            Female
          </label>
          </div>
          <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
          <label className='lbl'>
            <Field name="gender" component="input" type="radio" value="others" />{' '}
            Others
          </label>
            {/* <label className="lbl">Others</label>
            <Field name="gender" type="radio" value={others} component={renderField}/> */}
          </div>  
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
  const{username}=state.userReducer;
  const{email}=state.userReducer; 
  const{password}=state.userReducer; 
  const{phone}=state.userReducer; 
  const{gender}=state.userReducer; 
  return{username,email,password,phone};
};

const actions = {
  signup
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'syncValidation',
      validate
    })) (userComponents)