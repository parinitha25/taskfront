const ROOT_API_URL = process.env.REACT_APP_ROOT_PATH;
// const ROOT_API_URL = 'http://localhost:8004/';
/* global fetch */
/* global sessionStorage */

// const setHeaders = () => {
//   return sessionStorage.getItem('token');
// }
const token = sessionStorage.token;

const setHeaders = () => {
  return sessionStorage.getItem('token');
}
const headers = () => {
  return {
  'Content-Type': 'application/json',
  'authorization': setHeaders() || '',
  }
}

export const api = {
  get: (path) => {
   return new Promise((resolve, reject) => {
     return fetch(`${ROOT_API_URL}${path}`,{
       headers: headers(),
     })
       .then(resp => resp.json())
       .then(resp => resolve(resp))
      //  sessionStorage.removeItem("token"))
       .catch(error => reject(error))
   })
 },
 post: (path, payload) => {
   payload = {
     method: 'post',
     body: JSON.stringify(payload),
     headers: headers(),
   }
   return new Promise((resolve, reject) => { 
     return fetch(`${ROOT_API_URL}${path}`, payload)
       .then(resp => resp.json())
       .then(resp => resolve(resp))
       .catch(error => reject(error))
   })
 },
 delete: (path,payload) => {
  payload = {
    method: 'delete',
    body: JSON.stringify(payload),
    headers: headers(),
  }
  return new Promise((resolve, reject) => {
    return fetch(`${ROOT_API_URL}${path}`,payload)
      .then(resp => resp.json())
      .then(resp => resolve(resp))
      .catch(error => reject(error))
  })
},
put: (path, payload) => {
  payload = {
    method: 'put',
    body: JSON.stringify(payload),
    headers: headers(),
  }
  return new Promise((resolve, reject) => {
    return fetch(`${ROOT_API_URL}${path}`, payload)
      .then(resp => resp.json())
      .then(resp => resolve(resp))
      .catch(error => reject(error))
  })
}
}
