import React, { useState, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import { AuthContext } from "../../../contexts/AuthContext"

import './styles.css'
export function Settings(){
  const [password, setPassword] = useState('')
  const [accountName, setAccountName] = useState('')
  const { auth} = useContext(AuthContext)

  const submitChangePassword = async () => {
    await fetch('http://localhost:9000/users/update-user/' + auth.data.id, {
      method: 'PATCH',
      body: JSON.stringify({
        password: password
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

  const submitChangeAccountname = async () => {
    await fetch('http://localhost:9000/users/update-user/' + auth.data.id, {
      method: 'PATCH',
      body: JSON.stringify({
        email: accountName
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

  return(
    <div className="settingsContainer">
      <Form>
        <Form.Group>
          <Form.Label>
            Change Password
          </Form.Label>
          <Form.Control type="textarea" placeholder={password} onChange={(e)=> setPassword(e.target.value)}/>
        </Form.Group>
        <Button onClick={submitChangePassword}>Submit</Button>
        <Form.Group>
          <Form.Label>
            Change Accountname
          </Form.Label>
          <Form.Control type="email" placeholder={accountName} onChange={(e)=> setAccountName(e.target.value)}/>
        </Form.Group>
        <Button onClick={submitChangeAccountname}>Submit</Button>
      </Form>
    </div>
  )
}
