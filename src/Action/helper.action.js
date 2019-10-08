export const API_REQUEST_PENDING = 'API_REQUEST_PENDING';
export const API_REQUEST_COMPLETE = 'API_REQUEST_COMPLETE';

export const apiRequestPending = () => ({
  type: API_REQUEST_PENDING,
})

export const apiRequestComplete = () => ({
  type: API_REQUEST_COMPLETE,
})