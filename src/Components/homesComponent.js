// import React, { Component } from 'react'
// import { Field, reduxForm } from 'redux-form';
// import {eventlist } from '../Action/signinAction';
// import {connect} from 'react-redux';
// import { compose } from 'redux';
// import {successAlertHandler,failureAlertHandler} from '../Action/alert.action';
// import '../CSS/signupComponent.css';
// import DatePicker from "react-datepicker"; 
// import "react-datepicker/dist/react-datepicker.css";


// class signupComponents extends Component {
//     constructor(props){
//       super(props);
//       this.state = {
//         name:'',
//         place:'',
//         date:new Date(),
//         // time:''
//       }
//     } 
//     handleDate=(date)=> {
//       debugger
//       this.setState({
//         date: date
//       });
//     } 
//     handleChange=(e)=>{
//       this.setState({[e.target.name]:e.target.value});
//   } 
//     handleSubmit=()=>{
//       debugger
//     const { name,place,date} = this.state;
//     const { history } = this.props;
//       const{ eventlist,successAlertHandler,failureAlertHandler}=this.props
//       console.log("payload")
//       eventlist({ name, place, date})
//       .then(resp => { 
//         // successAlertHandler(resp);
//         history.push('/');
//     })
//     .catch(error => {
//         failureAlertHandler(error);
//     })
//     }


//   render() {
//     const { name,place,date} = this.state;
//     return (
//       <div>
        
//         <h1 className='heading'>Registration Form</h1>
//         <div className="row">
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
//             <label className='lbl'>name</label>
//           </div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
//             {/* <Field className='input' name="name" type="text"  component={renderField} /> */}
//             <input type='text' name="name" onChange={this.handleChange} value={name}/>
//           </div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
//         </div>
//         <div className="row">
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
//         </div>
                                    
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
//         </div>
//         <div className="row">
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
//             <label className="lbl">date</label>
//             <DatePicker
//                                           selected={this.state.date}
//                                           onChange={this.handleDate}
//                                           showTimeSelect
//                                           // showTimeSelectOnly
//                                           timeIntervals={15} cf
//                                           dateFormat="dd mm yyyyh:mm aa"
//                                           timeCaption="Time"
//                                           className='input_boxa'
//                                           name="date"
//                                           value={date}
//                                         />
//           </div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
//             {/* <Field name="time" type="text"  value={password} component={renderField}  className="input" /> */}
//           </div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
//         </div>
//         <div className="row">
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
//             <label className="lbl">place</label>
//           </div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
//             <input type='text' name="place" value={place} onChange={this.handleChange}/>
//             {/* <Field name="place" type="text" component={renderField}  className="input"/>        */}
//           </div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
//         </div>
//         <div className="row">
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
//             <button onClick={this.handleSubmit}>
//               Register
//             </button>
//           </div>
//           <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div> 
//         </div>
//       </div>
//               )
//   }
// }
// const mapStateToProps=(state)=>{
//     const{name}=state.signinReducer; 
//       const{date}=state.signinReducer; 
//       const{place}=state.signinReducer; 
//       const{time}=state.signinReducer; 
//     //   const{token}=state.signinReducer; 
//       return{name,date,time,place};
// };

// const actions = {
//     eventlist,
//     successAlertHandler,
//     failureAlertHandler

// }
// export default connect(mapStateToProps,actions )(signupComponents);


 // modelupdate = (index) => {
  //   // this.Events[index]
  //   // const key = e.target.name
  //   // const value = e.target.value 
  //   // // debugger
  //   // this.setState({updateObj[key]: value})]
  //   // console.log("res ====", resp)
  //   debugger
  //   this.setState({
  //     modelOpenss: !this.state.modelOpenss,
  //     updateObj:this.state.Events[index]
  //   })
  // }