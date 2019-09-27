import React, { Component } from 'react';
import { handleClick } from '../Action/userAction';
import {connect} from 'react-redux';
import { signup } from '../Components/backendfunction';


class userComponents extends Component{
  constructor(props){
    super(props);
    this.state={
      Uname:'',
      Email:'',
      Age:'',
      Urequired:'',
      Erequired:'',
      Arequired:''       
    }
  }
  handleC=(e)=>{
    this.setState({[e.target.name]:e.target.value});     
  }
  handleS=(e)=>{
    const user = {
      Uname: this.state.Uname,
      Email: this.state.Email,
      Age: this.state.Age
    }
    signup(user).then(res => {
    })
    var t=0;    
    var reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    if(!this.state.Uname) this.setState({Urequired:'user name is required'});
      else {
        t++;
        this.setState({Urequired:''});
      }
    if(!this.state.Email) this.setState({Erequired:'Email is required'});
      else if(!reg_email.test(this.state.Email)) this.setState({Erequired:'Invalid Email'}); 
        else {
          t++;
          this.setState({Erequired:''});
        }
    if(!this.state.Age) this.setState({Arequired:'Age is required'});
        else if(this.state.Age<18)this.setState({Arequired:'age should be greter than 18'}); 
          else {
            t++;
            this.setState({Arequired:''});
          }
    if(t>2){
        alert("register sucessfully");
    }
}   
render(){
  return(
    <div  className="backgrounda">   
      <form name="forms">
        <label><b>REGISTER</b></label><br/>
        <label className="alignment"><b>Username</b></label><br/>
          <input className="alignmenta" type='text' name="Uname"  onChange={this.handleC}/><br/>
          <p>{this.state.Urequired}</p>
        <label className="alignment"><b>Email</b></label><br/>
          <input className="alignmenta" type='text' name="Email"  onChange={this.handleC}/><br/>
          <p>{this.state.Erequired}</p>
        <label className="alignment"><b>Age</b></label><br/>
          <input className="alignmenta" type='number' name="Age"  onChange={this.handleC}/><br/>
          <p>{this.state.Arequired}</p>  
      </form>
      <button onClick={this.handleS}  className="colorsa">Send</button>
      <button onClick={this.handleS}>Reset</button>
          <h1>{this.props.message}</h1> 
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  const{Uname}=state.userReducer;
  const{Email}=state.userReducer; 
  const{Age}=state.userReducer;
  const{message}=state.userReducer;  
  return{Uname,Email,Age,message};
};

export default connect(mapStateToProps, { handleClick })(userComponents);