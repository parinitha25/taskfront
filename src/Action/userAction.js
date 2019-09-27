import *as ActionTypes from '../Action/types';

export function handleClick() {
  return function (dispatch) {
    dispatch({ type: "CLICK" });
  }
}
