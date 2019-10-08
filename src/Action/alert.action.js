export const SUCCESS_ALERT='SUCCESS_ALERT';
export const FAILURE_ALERT='FAILURE_ALERT';
export const CLEAR_BOTH_ALERT='CLEAR_BOTH_ALERT';

const successAlert = (message) => {
  return {
    type: SUCCESS_ALERT,
    message,
  }
}

const failureAlert = (error) => {
  return {
    type: FAILURE_ALERT,
    error,
  }
}

const formateMessage = (data) => {
  if(typeof(data) === 'string'){
    return data;
  } else {
    return data.toString();
  }
}

export const successAlertHandler = message => (dispatch) => {
  const formattedMessage = formateMessage(message);
  setTimeout(() => dispatch(clearBothAlertHandler()),3000);
   dispatch(successAlert(formattedMessage));
};

export const failureAlertHandler = error => (dispatch) => {
  const formattedMessage = formateMessage(error);
  setTimeout(() => dispatch(clearBothAlertHandler()),3000);
  dispatch(failureAlert(formattedMessage));
}

export const clearBothAlertHandler = () => {
  return {
    type: CLEAR_BOTH_ALERT
  }
}