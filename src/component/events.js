import React, { Component } from 'react'
import { posteventlist, getalluser, validateuser, geteventlist, deleteContactlist,update } from '../action/events.action';
import { connect } from 'react-redux';
import { successAlertHandler, failureAlertHandler } from '../action/alert.action';
import '../css/Allcomponent.css';
import { Button, Modal, ModalBody,ModalHeader} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Edit from '../component/edit';
import Delete from '../component/delete';
import moment from 'moment';
import Navbar from './Navbar';


class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      events: [],
      name: '',
      place: '',
      date: new Date(),
      time: new Date(),
      model: false,
      modeldelete: false,
      modelupdate:false,
      message:''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDate = (date) => {
    this.setState({
      date: date,
      time: date
    });
  }
  /*------ call validate user api----------- */
  componentDidMount = () => {
    const { validateuser,successAlertHandler, failureAlertHandler } = this.props
    validateuser()
      .then(resp => {
        successAlertHandler(resp);
      })
      .catch(error => {
        failureAlertHandler(error);
        sessionStorage.removeItem("token")
      })
    }
  
    /* ---------------call  alluser api----------- */
  componentWillMount = () => {
    const { getalluser,geteventlist, failureAlertHandler } = this.props
    getalluser()
      .then(resp => {
        this.setState({ user: resp })
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  
    geteventlist()
      .then(resp => {
        this.setState({ events: resp })
      })
      .catch(error => {
        failureAlertHandler(error);
      })
    } 

    /* ----------post model event--------- */
  model = () => {
    this.setState({
      modelOpenpost: !this.state.modelOpenpost
    });
  }
    /* ---------post the events------ */
  handleSubmitpost = () => {
    const { name, place, date, time } = this.state;
    const { posteventlist,  failureAlertHandler } = this.props
    posteventlist({ name, place, date, time })
      .then(resp => {
        this.setState({
          modelOpenpost: !this.state.modelOpenpost
        });
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  }
 
    /*--------delete model------*/
  modeldelete = (index) => {
    this.setState({
      modelOpendelete: !this.state.modelOpendelete,
      deletevalues: this.state.events[index]
    })
  }
   
    /*---call delete child component---*/
  deletelist(){
      return <Delete deletelist={this.state.deletevalues} sucessmessage={this.state.message} onsubmit={this.onsubmitdelete}  onsubmitclose={this.onsubmitdeleteclose} />
  }
    /*--------delete submit button------*/
  onsubmitdelete = (deleteobject) => {
    const { deleteContactlist, failureAlertHandler } = this.props
    deleteContactlist(deleteobject._id)
      .then(resp => {
        this.setState({message:resp})
        setTimeout(
          function() {
          this.setState({modelOpendelete: !this.state.modelOpendelete})
          } 
          .bind(this),
          3000
        ); 
      })
      .catch(error => {
        failureAlertHandler(error);  
      })
  }
  onsubmitdeleteclose= () => {
    this.setState({
      modelOpendelete: !this.state.modelOpendelete,
    });
  }
    /* --------update model ---------- */
  modelupdate = (index) => {
    this.setState({
      modelOpenupdate: !this.state.modelOpenupdate,
      updatevalues: this.state.events[index]
    })
  }
    /*---------call child component ----------*/
  Updatelist(){
    return <Edit updatelist={this.state.updatevalues} onsubmit={this.onsubmitupdate}/>
  }
  

   /*--------update submit button------ */
  onsubmitupdate = (updateobject) => {
    const {update,successAlertHandler, failureAlertHandler} = this.props
    update(updateobject,updateobject._id)
      .then(resp=> {
        successAlertHandler(resp);
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  } 

  render() {
    const { name, place } = this.state
    return (
      <div>
         <Navbar/>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
            <table border="1" className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Phone no</th>
              </tr>
              </thead>
              <tbody>
              {this.state.user.map((resp, index) => (
                <tr>
                  <td>{resp.username}</td>
                  <td>{resp.email}</td>
                  <td>{resp.gender}</td>
                  <td>{resp.phone}</td>
                </tr>
              ))}
              </tbody>
            </table>
            <div className="row">
              <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5"></div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 ">
                <Button color="info" className="border" onClick={this.model}><b>Events</b>
                    <Button color="info" className="border" onClick={this.model}>+</Button>
                </Button>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            </div>
            <table border="1" className="table">
            <thead>
              <tr className="tableheading">
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Place</th>
                <th colSpan='2'>Buttons</th>
              </tr>
              </thead>
              <tbody>
                {this.state.events.map((resp, index) => (
                  <tr>
                    <td>{resp.name}</td>
                    <td>{moment(resp.date).format('YYYY-MM-DD')}</td>
                    <td>{moment(resp.time).format( 'h:mm a')}</td>
                    <td>{resp.place}</td> 
                    <td><button onClick={ () => this.modelupdate(index)} className="btn btn-success edit">Edit</button>
                    <button onClick={ () => this.modeldelete(index)} className="btn btn-danger remove" >Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'> </div>
        </div>
        <Modal isOpen={this.state.modelOpenpost}>
        <ModalHeader toggle={this.model} className="Events_heading modalcolor"><h1>Events</h1></ModalHeader>
          <ModalBody className="modalcolor">
            <div className='row'>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 "></div>
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                  <div className='row'>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 date">    
                      <label><b>Name</b></label>
                    </div>
                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 date">
                      <input type='text' name="name" onChange={this.handleChange} className="input_box" value={name} />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                  </div>
                  <div  className='row'>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 date">
                      <label><b>Date</b></label>
                    </div>
                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 date">
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDate}
                      />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                  </div>
                  <div className='row'>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 date">
                      <label><b>Time</b></label>
                    </div>
                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 date">
                      <DatePicker
                        selected={this.state.time}
                        onChange={this.handleDate}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat=" h:mm aa"
                      />
                      </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                  </div>
                  <div className='row'>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 date">
                        <label><b>Place</b></label>
                    </div>
                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 date">
                        <input type='text' name="place" value={place}  onChange={this.handleChange} />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                  </div>
                    <button onClick={this.handleSubmitpost} className="btn btn-success signup_btn">Submit</button>
              </div>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 "></div>
            </div>
          </ModalBody>
        </Modal>
        {this.state.modelOpendelete && <Modal isOpen={this.state.modelOpendelete}>
        <ModalHeader toggle={this.modeldelete} className="Events_heading modalcolord"><h1>Events</h1></ModalHeader>
          <ModalBody className="modalcolord">
             {this.deletelist()}
          </ModalBody>
        </Modal>}
        {this.state.modelOpenupdate && <Modal isOpen={this.state.modelOpenupdate}>
        <ModalHeader toggle={this.modelupdate} className='Events_heading modalcolore'><h1>Events</h1></ModalHeader>
          <ModalBody className="modalcolore">
            {this.Updatelist()}
          </ModalBody>
        </Modal>}  
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {name, date, time, place} = state.eventsReducer;
  return { name, date, time, place };
};

const actions = {
  deleteContactlist,
  getalluser,
  validateuser,
  posteventlist,
  geteventlist,
  update,
  successAlertHandler,
  failureAlertHandler
}

export default connect(mapStateToProps, actions)(Events)