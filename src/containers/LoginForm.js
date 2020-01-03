import React, { useState, useContext } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../App'


//POST https://insta.nextacademy.com/api/v1/login
/*localStorage.getItem('name') // "Josh"
sessionStorage.getItem('clickCount') // 10, but this data is deleted when user closes the browser tab
.then(result => {
  localStorage.setItem('jwt', result.data.auth_token)
})*/

const LoginForm =({ toggleModal }) => {
    const history = useHistory()
 
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
  })

const { username, password } = userInfo

const [loading, setLoading] = useState(false)

const [validUser, setValidUser] = useState(null)

const [timer, setTimer] = useState(null)

const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    Axios.post('https://insta.nextacademy.com/api/v1/login', {
      username,
      password,
    })
    .then(result => {
        const {user, message} = result.data
        console.log(result)
        console.log(user)
        console.log(message)

        setLoading(false)
        toast.success("Logged in successfully! Welcome back, we've missed you", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true

        });
         // show popup message
        toggleModal() // close modal
        history.push(`/users/${user.id}`) // go to user profile page
    })
    .catch(err => {
        console.log(err.response)
        err.response.data.message.forEach(msg => toast.error(msg))
        setLoading(false)
    })
  }

  const handleInput = e => {
    const { name, value } = e.target

    // if typing in 'username' field
    if (name === 'username') {
      setValidUser(null) // to clear info message
      clearTimeout(timer) // reset timer

      const newTimer = setTimeout(() => {
        // make api call to check if username is valid
        Axios.get(
          `https://insta.nextacademy.com/api/v1/users/check_name?username=${value}`
        ).then(result => {
          setValidUser(result.data.valid ? 'valid' : 'invalid')
        })
      }, 500)
      setTimer(newTimer)
    }

    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

return (
    <form onSubmit={handleSubmit}>
      <label>Username: </label>
      <input
        name="username"
        value={username}
        onChange={handleInput}
        type="text"
      />
      <br />
    
      <label>Password: </label>
      <input
        name="password"
        value={password}
        onChange={handleInput}
        type="password"
      />
      <br />
    
      <input
        className="btn btn-info"
        type="submit"
        disabled={loading}
        value={loading ? 'Logging In...' : 'Log In'}
      />
    </form>
)
}

export default LoginForm