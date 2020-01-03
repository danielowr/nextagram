import React, { useState, createContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'

import HomePage from './pages/HomePage';
import Navbar from './containers/Navbar';
import UserProfilePage from './pages/UserProfilePage';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
// import UserProfilePage from './pages/UserProfilePage';
import MyProfilePage from './pages/MyProfilePage';
import UploadPage from './pages/UploadPage';
const AuthContext = createContext(null)


/*const App = () => {
  /** 
   * The default boolean for loggedIn state would be
   * determined by whether JWT exists in localStorage
  */
  /*const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )
}

const YourComponent = () => {
  let history = useHistory()

  //... somwhere in your code, you can:
  history.push('/page-you-want-to-redirect-to')
}*/

const App = () => {
  const [ currentUser, setCurrentUser ] = useState({
    user: localStorage.user ? JSON.parse(localStorage.user) : null,
    jwt: localStorage.jwt
  })

  const contextValue = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser
  }
  return (
  <>
      {/* <NavBar /> */}
    <AuthContext.Provider value={contextValue}>
      <ToastContainer 
        className="text-center text-info"
        hideProgressBar
        position={toast.POSITION.TOP_CENTER}
      />
      <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/users/:id">
          <UserProfilePage />
       </Route>
        <Route path="/me">
          <MyProfilePage/>
        </Route>
        <Route exact path="/upload">
          <UploadPage/>
        </Route>
      </Switch>
    </AuthContext.Provider>
  </>
  )
}



/*function App () {
  const [users, setUsers] = useState([
    {
 useEffect(() => {
  axios.get('https://insta.nextacademy.com/api/v1/users') 
  .then(result => {
    return (
      <div>
        <h1>Home Page</h1>
        <ul>{users.map(user => (
          <li>{user.id} : {user.profileImage} : {user.username}</li>))}
          </ul>
      </div>
    )
    setUsers([])
  }) 
  .catch(error => {

    console.log('ERROR: ', error)
  }) 
}, []) 
}
/*function App() {

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "blake",
      profileImage:
        <img src="http://next-curriculum-instagram.s3.amazonaws.com/idol2-blake.jpg"></img>
    },
    {
      id: 2,
      username: "ryanG",
      profileImage:
        <img src="http://next-curriculum-instagram.s3.amazonaws.com/idol1-ryan.jpg"></img>
    },
    {
      id: 3,
      username: "bigfan",
      profileImage:
        <img src="http://next-curriculum-instagram.s3.amazonaws.com/bigfan-9AE7468E-4C35-41D1-AA68-31939891B5E1.png"></img>
    }
  ]);

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {users.map(user => (
          <li>
            {user.id}: {user.profileImage}: {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}*/


export default App;
export { AuthContext }
