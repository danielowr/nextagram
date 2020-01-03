import React, { useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const SignUpForm = ({ toggleModal }) => {
  const history = useHistory()
 
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: '',
    verifyPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(null)

  const [validUser, setValidUser] = useState(null)
  // null -- show no message
  // 'invalid' -- show username is invalid
  // 'valid' -- show username is valid

  const { email, username, password, verifyPassword } = userInfo

  const displayHelperMessage = () => {
    if (validUser) {
      if (validUser === 'valid') {
        return <p className="text-success">Username is available!!</p>
      } else {
        return <p className="text-danger">Username has been taken!</p>
      }
    } else {
      return null
    }
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

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    Axios.post('https://insta.nextacademy.com/api/v1/users/', {
      username,
      email,
      password,
    })
      .then(result => {
        const {user, message} = result.data
        console.log(result)

        setLoading(false)
        toast(message) // show popup message
        toggleModal() // close modal
        history.push(`/users/${user.id}`) // go to user profile page
      })
      .catch(err => {
        console.log(err.response)
        err.response.data.message.forEach(msg => toast(msg))
        setLoading(false)
      })
  }

  /*const disable e => {
    e.preventDefault()
    let disable = true;
    if (this.inputEmail || this.inputUsername || this.inputPassword || this.inputConfirmPassword) {     
        disable = false;
    } 
    return disable;
}*/

  return (
    <form onSubmit={handleSubmit}>
      <label>Username: </label>
      <input
        name="username"
        value={username}
        onChange={handleInput}
        type="text"
      />
      {displayHelperMessage()}
      <br />

      <label>Email: </label>
      <input name="email" value={email} onChange={handleInput} type="email" />
      <br />

      <label>Password: </label>
      <input
        name="password"
        value={password}
        onChange={handleInput}
        type="password"
      />
      <br />

      <label>Confirm Password: </label>
      <input
        name="verifyPassword"
        value={verifyPassword}
        onChange={handleInput}
        type="password"
      />
      <br />

      <input
        className="btn btn-info"
        type="submit"
        disabled={
          email.length < 1 || username.length < 1 || password.length < 1 || loading
        }
        value={loading ? 'Signing Up...' : 'Sign Up!'}
      />
    </form>
  )
}

export default SignUpForm