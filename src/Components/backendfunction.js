import axios from 'axios'

export const signup = newUser => {
  debugger
  return axios
    .post('signup', {

      Uname: newUser.Uname,
      Email: newUser.Email,
      Age: newUser.Age
    })
    .then(res => {
      console.log('registered successfully')
    })
}