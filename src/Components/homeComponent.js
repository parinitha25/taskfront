import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import { getallsignin, getsignin, validateuser, eventlists, deleteContactlist } from '../Action/homeAction';
import { eventlist } from '../Action/signinAction'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { successAlertHandler, failureAlertHandler } from '../Action/alert.action';
import '../CSS/signupComponent.css';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
      modal: false,
      modeldelete: false
    }
  }
  getallsignin = () => {
    const { getallsignin, successAlertHandler, failureAlertHandler } = this.props
    const { history } = this.props;
    getallsignin()
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
  componentDidMount = () => {
    debugger
    const { validateuser, successAlertHandler, failureAlertHandler } = this.props
    validateuser()
      .then(resp => {
        successAlertHandler(resp);
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  }

  componentDidMount = () => {
    debugger
    const { getsignin, failureAlertHandler } = this.props
    getsignin()
      .then(resp => {
        this.setState({ User: resp })
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  }
  componentWillMount = () => {
    debugger
    const { eventlists, successAlertHandler, failureAlertHandler } = this.props
    const { history } = this.props;
    eventlists()
      .then(resp => {
        this.setState({ Events: resp })

      })
      .catch(error => {
        failureAlertHandler(error);
        sessionStorage.removeItem("token")
        history.push('/');
      })
  }
  handleDate = (date) => {
    this.setState({
      date: date,
      time: date
    });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = () => {
    const { name, place, date, time } = this.state;
    const { history } = this.props;
    const { eventlist, successAlertHandler, failureAlertHandler } = this.props
    eventlist({ name, place, date, time })
      .then(resp => {
        // successAlertHandler(resp);
        this.setState({
          modelOpen: !this.state.modelOpen
        });
        window.location.reload();
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  }
  handleSubmitdelete = (_id) => {
    const { deleteContactlist, deleteContactsucess, successAlertHandler, failureAlertHandler } = this.props
    debugger
    deleteContactlist(_id)
      .then(resp => {
        // successAlertHandler(resp);
        this.setState({
          modelOpens: !this.state.modelOpens,
        });
        // window.location.reload();
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  }
  model = () => {
    this.setState({
      modelOpen: !this.state.modelOpen
    });
  }

  modeldelete = (resp, dispatch) => {
    this.setState({
      modelOpens: !this.state.modelOpens,
      deleteObj: resp,
    })
  }

  render() {
    const { handleSubmit } = this.props
    const { name, date, time, place } = this.state
    return (
      // <form {handleSubmit(this.getallsignin)}>
      // <form onSubmit={handleSubmit(this.getallsignin)}>
      <div>
        <button className="logout" onClick={handleSubmit(this.getallsignin)}>Logout</button>
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
            <Button color="success" className="border" onClick={this.model}>+</Button></Button>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            </div>
            <table border="1" className="table">
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Place</th>
                <th colSpan='2'>Buttons</th>
              </tr>
              {this.state.Events.map((resp, _id) => (
                <tr>
                  <td>{resp.name}</td>
                  <td>{resp.date}</td>
                  <td>{resp.time}</td>
                  <td>{resp.place}</td>
                  <td><img src="/edit1.png" alt="image111" className="editimage" /></td>
                  {/* <td><img src="/delete1.png" alt="image111" className="deleteimage" /></td>                    */}
                  <button onClick={() => this.modeldelete(resp)} className="btn btn-danger">Remove</button>
                </tr>
              ))}
            </table>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'> </div>
        </div>
        <Modal isOpen={this.state.modelOpen}>
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
                <button onClick={this.handleSubmit} className="btn btn-success signup_btn">Submit</button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {this.state.modelOpens && <Modal isOpen={this.state.modelOpens}>
          <ModalBody className=" row signup_box">

            <h4>Do you want to delete this list</h4>
            {this.state.deleteObj._id}
            {this.state.deleteObjs}
            <table border="1" className="table">
              <button onClick={() => this.handleSubmitdelete(this.state.deleteObj._id)}>yes</button>
              <button>No</button>
            </table>
          </ModalBody>
        </Modal>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { name } = state.homeReducer;
  const { date } = state.homeReducer;
  const { place } = state.homeReducer;
  const { time } = state.homeReducer;
  const { token } = state.homeReducer;
  return { name, date, time, place, token };

};

const actions = {
  getallsignin,
  deleteContactlist,
  getsignin,
  validateuser,
  eventlist,
  eventlists,
  successAlertHandler,
  failureAlertHandler
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'syncValidation',
  }))(homeComponent)