import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';

class Editcomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateobject:props.updatelist
    }     
}

  handleChanges = (e) => {   
    const {updateobject} = this.state;
    updateobject[e.target.name] = e.target.value
    this.setState({updateobject})
  }

  handlesubmitupdate=()=>{
    this.props.onsubmit(this.state.updateobject);
  }

  handleDate = (date) => {
    this.setState({
      date: date,
      time: date
    });
  }

  render() {
    return (
        <div>
            <div className='row'>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 "></div>
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <h1 className='signup_heading'>Events</h1>
                <div>
                  <label>Name</label>
                  <input type='text' name="name" onChange={this.handleChanges} className="input_box" value={this.state.updateobject.name} />
                </div>
                <div>
                  <label>Date</label>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDate}
                    className="date"
                    value={this.state.updateobject.date}
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
                    value={this.state.updateobject.time}
                  />
                </div>
                <label>Place</label>
                <input type='text' name="place" value={this.state.updateobject.place} className="input_box" onChange={this.handleChanges} />
                <button onClick={this.handlesubmitupdate} className="btn btn-success signup_btn">Submit</button>
              </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { name } = state.homeReducer;
  const { date } = state.homeReducer;
  const { place } = state.homeReducer;
  const { time } = state.homeReducer;
  return { name, date, time, place};
};


export default connect(mapStateToProps)(Editcomponent)