import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import './styles.css'
import { Navbar, Nav, Button } from 'react-bootstrap'
import {AuthContext}  from '../../../contexts/AuthContext'
export function Navigation(){
  const { auth, setAuthData } = useContext(AuthContext);
  const onLogOut = () => {
    setAuthData(null)
  }
  return auth.data ? (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand>ORGZ!</Navbar.Brand>
      <Nav.Link>
        <Link to="/">Dashboard</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/settings">Settings</Link>
      </Nav.Link>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: {auth.data.mail}
        </Navbar.Text>
        <Button 
            variant="outline-info"
            onClick={onLogOut}
            className="buttonRight"
          >Log Out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  ) : (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand>ORGZ!</Navbar.Brand>
    </Navbar>
  )
}
