import React, { Component } from 'react'
import { logout,posteventlist, getalluser, validateuser, geteventlist, deleteContactlist,update } from '../Action/home.action';
import { connect } from 'react-redux';
import { successAlertHandler, failureAlertHandler } from '../Action/alert.action';
import '../CSS/Allcomponent.css';
import { Button, Modal, ModalBody} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Editcomponent from './Editcomponent';


class homeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: [],
      Events: [],
      token: "",
      name: '',
      place: '',
      date: new Date(),
      time: new Date(),
      model: false,
      modeldelete: false,
      modelupdate:false
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
        this.setState({ User: resp })
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  
    geteventlist()
      .then(resp => {
        this.setState({ Events: resp })
      })
      .catch(error => {
        failureAlertHandler(error);
      })
    } 
  
    /* ----------logout button---------- */
  logout = () => {
    const { logout, successAlertHandler, failureAlertHandler } = this.props
    const { history } = this.props;
    logout()
      .then(resp => {
        successAlertHandler(resp);
        sessionStorage.removeItem("token")
        history.push('/');
      })
      .catch(error => {
        failureAlertHandler(error);
        sessionStorage.removeItem("token")
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
        window.location.reload();
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  }
    /*--------delete model------*/
  modeldelete = (index) => {
    this.setState({
      modelOpendelete: !this.state.modelOpendelete,
      deleteObj: this.state.Events[index]
    })
  }
  
    /*--------delete submit button------*/
  handleSubmitdelete = (_id) => {
    const { deleteContactlist, successAlertHandler, failureAlertHandler } = this.props
    deleteContactlist(_id)
      .then(resp => {
        successAlertHandler(resp);
        this.setState({
          modelOpendelete: !this.state.modelOpendelete,
        });
        window.location.reload();
      })
      .catch(error => {
        failureAlertHandler(error);  
      })
  }
  handleSubmitdeleteclose= () => {
    this.setState({
      modelOpendelete: !this.state.modelOpendelete,
    });
  }
    /* --------update model ---------- */
  modelupdate = (index) => {
    this.setState({
      modelOpenupdate: !this.state.modelOpenupdate,
      updatevalues: this.state.Events[index]
      
    })
  }
    /*---------call child component ----------*/
  Updatelist(){
    return <Editcomponent updatelist={this.state.updatevalues} onsubmit={this.onsubmitupdate} key='1' />;
  }

   /*--------update submit button------ */
  onsubmitupdate = (updateobject) => {
    const {update,successAlertHandler, failureAlertHandler} = this.props
    update(updateobject,updateobject._id)
      .then(resp=> {
        successAlertHandler(resp);
        window.location.reload();
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  } 

  render() {
    const { name, place } = this.state
    return (
      <div>
        <button className="logout" onClick={this.logout}>Logout</button>
        <div className="row">
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>
          <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
            <table border="1" className="table">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Phone no</th>
              </tr>
              {this.state.User.map((resp, key) => (
                <tr>
                  <td>{resp.username}</td>
                  <td>{resp.email}</td>
                  <td>{resp.gender}</td>
                  <td>{resp.phone}</td>
                </tr>
              ))}
            </table>
            <div className="row">
              <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5"></div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 ">
                <Button color="success" className="border" onClick={this.model}>Events
                    <Button color="success" className="border" onClick={this.model}>+</Button>
                </Button>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            </div>
            <table border="1" className="table">
              <tr className="tableheading">
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Place</th>
                <th colSpan='2'>Buttons</th>
              </tr>
              {this.state.Events.map((resp, index) => (
                <tr>
                  <td>{resp.name}</td>
                  <td>{resp.date}</td>
                  <td>{resp.time}</td>
                  <td>{resp.place}</td> 
                  <td><button onClick={ () => this.modelupdate(index)} className="btn btn-danger edit">Edit</button>
                  <button onClick={ () => this.modeldelete(index)} className="btn btn-danger remove" >Remove</button></td>
                </tr>
              ))}
            </table>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'> </div>
        </div>
        <Modal isOpen={this.state.modelOpenpost}>
          <ModalBody className=" row signup_box">
            <div className='row'>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 "></div>
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <h1 className='signup_heading'>Events</h1>
                <div>
                  <label>Name</label>
                  <input type='text' name="name" onChange={this.handleChange} className="input_box" value={name} />
                </div>
                <div>
                  <label>Date</label>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDate}
                    className="date"
                  />
                </div>
                <div>
                  <label>Time</label>
                  <DatePicker
                    selected={this.state.time}
                    onChange={this.handleDate}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat=" h:mm aa"
                    className="date"
                  />
                </div>
                <label>Place</label>
                <input type='text' name="place" value={place} className="input_box" onChange={this.handleChange} />
                <button onClick={this.handleSubmitpost} className="btn btn-success signup_btn">Submit</button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {this.state.modelOpendelete && <Modal isOpen={this.state.modelOpendelete}>
          <ModalBody className=" row signup_box">
            <h4>Do you want to delete this list</h4>
            {this.state.deleteObj._id}
            <table border="1" className="table">
              <button onClick={() => this.handleSubmitdelete(this.state.deleteObj._id)}>yes</button>
              <button onClick={()=>this.handleSubmitdeleteclose()}>No</button>
            </table>
          </ModalBody>
        </Modal>}
        {this.state.modelOpenupdate && <Modal isOpen={this.state.modelOpenupdate}>
          <ModalBody>
            {this.Updatelist()}
          </ModalBody>
        </Modal>}  
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { name } = state.homeReducer;
  const { date } = state.homeReducer;
  const { place} = state.homeReducer;
  const { time } = state.homeReducer;
  return { name, date, time, place };
};

const actions = {
  logout,
  deleteContactlist,
  getalluser,
  validateuser,
  posteventlist,
  geteventlist,
  update,
  successAlertHandler,
  failureAlertHandler
}

export default connect(mapStateToProps, actions)(homeComponent)