import * as ActionTypes from '../Action/types';

const intialState = {
  Uname: '',
  Email: '',
  Age: ''
};

export default (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.CLICK: {
      return { ...state }
    }
    default:
      return state;
  }
}