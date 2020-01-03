import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink

  } from 'reactstrap';

import { Link } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
//import UploadPage from '../pages/UploadPage'



const MyNav = ({currentUser,setCurrentUser}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const handleLogout = () =>{
      localStorage.clear()
      setCurrentUser({
        user :null,
        jwt:undefined
      })
    }
    return (
        <div id="nav">
          <Navbar color="transparent" light expand="md">
            <NavbarBrand tag={Link} to="/" href="/">
              <img
                height="35"
                width="47"
                src="https://cdn.dribbble.com/users/41636/screenshots/2719580/instagram-logo-concept.jpg"
                alt=""
              />
              Reactagram
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {/* <Link to="/">Go to Home</Link> */}
                  <NavLink tag={Link} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  {/* <Link to="/">Go to Home</Link> */}
                  <NavLink href="Upload">
                    Upload
                  </NavLink>
                </NavItem>
                {currentUser.user ?
                <NavItem onClick={handleLogout}>
                  <NavLink href="#">
                    Logout
                  </NavLink>
                </NavItem>
                : <AuthModal currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                }
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      )
    }

export default MyNav