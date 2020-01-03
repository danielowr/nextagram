import React, { useState, useContext } from 'react'

import styled from 'styled-components'
import {
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button
} from 'reactstrap'
import SignUpForm from '../containers/SignUpForm'
import LoginForm from '../containers/LoginForm'
import { AuthContext } from '../App'


const AuthModal = props => {
  const [showModal, setShowModal] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const { currentUser } = useContext(AuthContext)
  const toggleModal = () => setShowModal(!showModal)
  const toggleForm = () => setShowLogin(!showLogin)
  const logout = () => alert('logged out')

  return (
  <div>
          {localStorage.jwt ? (
        <a href="#" className="nav-link" onClick={logout}>
          Log out
        </a>
      ) : (
        <a href="#" className="nav-link" onClick={toggleModal}></a>
      <>
        {!currentUser.jwt && (
          <a
            href="/"
            className="nav-link"
            onClick={e => {
              e.preventDefault ()
              toggleModal ()
            }}
          >
            Login
          </a>
        )}
        <Modal>
          <SignUpForm toggleModal={toggleModal} toggleForm={toggleForm} />
      )}
      </Modal>
  </div>
      )}
          
    <>
      <NavItem>
        <NavLink onClick={toggleModal}>Login</NavLink>
      </NavItem>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Reactagram</ModalHeader>
        <ModalBody>
          {showLogin ? <LoginForm toggleModal={toggleModal}/> : <SignUpForm toggleModal={toggleModal}/> }
          <a onClick={toggleForm} className="d-block" href="#">
            {showLogin
              ? 'Not a member? Click here to sign up!'
              : 'Have an account? Log in'}
          </a>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Log in with Facebook
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
export default AuthModal