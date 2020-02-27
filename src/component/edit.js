import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import moment from 'moment';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateobject: props.event
    }
  }

  handleChange = (e) => {
    const { updateobject } = this.state;
    updateobject[e.target.name] = e.target.value
    this.setState({ updateobject })
  }

  handlesubmitupdate = () => {
    this.props.onsubmit(this.state.updateobject);
  }

  handleChangedate = date => {
    const { updateobject } = this.state;
    updateobject.date = date;
    updateobject.time = date;
    this.setState({
      updateobject
    });
  };

  render() {
    return (
      <div>
        <div className='row'>
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 "></div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <div className='row'>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <label><b>Name</b></label>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <input type='text' name="name" onChange={this.handleChange} className="input_box" value={this.state.updateobject.name} />
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            </div>
            <div className='row'>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2  date">
                <label><b>Date</b></label>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 date">
                <DatePicker
                  selected={new Date(this.state.updateobject.date)}
                  onChange={this.handleChangedate}
                  value={moment(this.state.updateobject.date).format('YYYY-MM-DD')}
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
                  selected={new Date(this.state.updateobject.time)}
                  onChange={this.handleChangedate}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                  timeCaption="time"
                  value={moment(this.state.updateobject.time).format('h:mm:ss a')}
                />
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            </div>
            <div className='row'>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2  date">
                <label><b>Place</b></label>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7  date">
                <input type='text' name="place" value={this.state.updateobject.place}
                  onChange={this.handleChange} />
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            </div>
            <button onClick={this.handlesubmitupdate} className="btn btn-success signup_btn">Submit</button>
          </div>
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 "></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, date, time, place } = state.eventsReducer;
  return { name, date, time, place };
};

export default connect(mapStateToProps)(Edit)