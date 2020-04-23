import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import {signup } from '../action/signup.action';
import {connect} from 'react-redux';
import { compose } from 'redux';
import {successAlertHandler,failureAlertHandler} from '../action/alert.action';
import { getinvite } from '../action/signup.action';
import '../css/Allcomponent.css';
import Cookies from 'js-cookie';


const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9_.]+)([a-zA-Z]{2,5})$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.phone) {
    errors.phone = 'Required'
  } else if (!/^[0-9]{3}-\d{3}-\d{4}$/i.test(values.phone)) {
    errors.phone = 'Invalid phone number'
  } 
  if (!values.password) {
    errors.password = 'Required'
  }  else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/i.test(values.password)) {
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


class signupuserComponents extends Component {
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
      const { history } = this.props;
      const userObj = {
        username: values.username,
        email:this.state.email,
        password:values.password,
        phone:values.phone,
        gender:values.gender,
        role:Cookies.get('role')
      }
      signup(userObj) 
        .then(resp=>{
          successAlertHandler(resp);
          history.push('/');
        })
        .catch(error => {
          failureAlertHandler(error);
        })
    }

    componentDidMount= () => { 
        const{getinvite,failureAlertHandler}=this.props   
        getinvite() 
          .then(resp=>{
              this.setState({ email: Cookies.get('mail')})          
          })
          .catch(error => {
          failureAlertHandler(error);
        })    
      }  

  render() {
    debugger
    const { handleSubmit, reset} = this.props
    const {email,username,password,phone} = this.state;
    return (
      <form onSubmit={handleSubmit(this.signup)}>
        <h1 className='heading_register'>Registration Form</h1>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <label className='lbl'><b>Username</b></label>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <Field className='input' name="username" type="text"  value={username} component={renderField} />
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        </div>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <label className="lbl"><b>Email</b></label>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <input name="email" type="text" defaultValue={email} className="inputemail" ></input>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        </div>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <label className="lbl"><b>Password</b></label>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <Field name="password" type="password"  value={password} component={renderField}  className="input" />
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        </div>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <label className="lbl"><b>Mobile number</b></label>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <Field name="phone" type="text"  value={phone} component={renderField}  className="input"/>       
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        </div>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <label className="lbl"><b>Gender</b></label>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 row'>
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
              <label className='lbl'>
                <Field name="gender" component="input" type="radio" value="male" />{' '}
                <b>Male</b>
              </label>
            </div>
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
              <label className='lbl'>
                <Field name="gender" component="input" type="radio" value="female" />{' '}
                <b>Female</b>
              </label>
            </div>
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
              <label className='lbl'>
                <Field name="gender" component="input" type="radio" value="others" />{' '}
                <b>Others</b>
              </label>
            </div>  
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
        </div>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <button type="submit" className='btn btn-primary lblr'>
              Register
            </button>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <button type="button"  onClick={reset} className='btn btn-primary clearvalues'>
              Clear Values
            </button>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div> 
        </div>
        <p className="anchortag"><a href="./">Already you register click here.....</a></p>
      </form>   
    )
  }
}

const mapStateToProps=(state)=>{
  const{username,email,password,phone,gender}=state.signupReducer;
  return{username,email,password,phone,gender};
};

const actions = {
  signup,
  getinvite,
  successAlertHandler,
  failureAlertHandler
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'syncValidation',
      validate
  })) (signupuserComponents)