import React, { useState, useContext } from "react"
import {AuthContext} from '../../../contexts/AuthContext'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom"
import './styles.css'

export function Login({history}){
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const { setAuthData } = useContext(AuthContext)

  const onFormSubmit = async e => {
    e.preventDefault()
    let fetchedData
    await fetch('http://localhost:9000/login/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
    }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(data => fetchedData = data)
    .then(() => {
      while (fetchedData === undefined || fetchedData.loading === true) console.log("wait for data")
      if(fetchedData.errorAvailable === true) setShowAlert(true)
      else {
        setAuthData(fetchedData)
        history.replace('/')
      }
    })
  }

  return (
    <div>
      <div className="loginRegContainer">
        <Form className="loginRegForm" onSubmit={onFormSubmit}>
          <Form.Group>
            <Form.Label>E-Mail</Form.Label>
            <Form.Control type="email" placeholder="Enter E-Mail" onChange={e => {setEmail(e.target.value)}}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => {setPassword(e.target.value)}}/>
          </Form.Group>
          <div className="leftContainer">
            <Button variant="primary" type="submit">
                Submit
            </Button>
          </div> 
          <div className="rightContainer">
              {
                  showAlert
                  ? <Alert variant="danger" style={{width: "100%"}}>Wrong data!</Alert>
                  : <></>
              }
          </div>
          <div className="backToLoginRegContainer">
            <Link to="/register">Register</Link>
          </div>
        </Form>
      </div>
    </div>
  )
}
