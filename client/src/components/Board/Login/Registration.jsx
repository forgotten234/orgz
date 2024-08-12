import React, { useState } from "react"
import { Form, Button, Alert, Modal } from 'react-bootstrap'
import { Link } from "react-router-dom"

export function Registration(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [userInUse, setUserInUse] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)

    const checkIfAccountIsInUse = async (checkData) => {
        if(checkData === true){
            setUserInUse(true)
            setShowPopUp(true)
        } else {
            setShowPopUp(true)
        }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()
        if(password === confirmedPassword){
            await fetch('http://localhost:9000/registration/register', {
                method: "POST",
                body: JSON.stringify({
                    email: {email},
                    password: {password}
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(async data => await checkIfAccountIsInUse(data.errorAvailable))
            .then(setShowAlert(false))
            .then(setUserInUse(false))
        } else {
            setShowAlert(true)
        }
    }

    const setEmailFromForm = e => setEmail(e.target.value)
    const setPasswordFromForm = e => setPassword(e.target.value)
    const setConfirmedPasswordFromForm = e => setConfirmedPassword(e.target.value)
    const handleClose = () => setShowPopUp(prevState => !prevState)

    return(
        <div>
            <div className="loginRegContainer">
                <Form className="loginRegForm" onSubmit={onFormSubmit}>
                    <Form.Group>
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type="email" placeholder="Enter E-Mail" onChange={setEmailFromForm}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={setPasswordFromForm}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Password again" onChange={setConfirmedPasswordFromForm}/>
                    </Form.Group>
                    <Form.Group>
                        <div className="leftContainer">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div> 
                        <div className="rightContainer">
                            {
                                showAlert
                                ? <Alert variant="danger" style={{width: "100%"}}>Password don't match!</Alert>
                                : <></>
                            }
                        </div>
                    </Form.Group>
                    <div className="backToLoginRegContainer">
                        <Link to="/sign-in">Back to Login</Link>
                    </div>
                </Form>
            </div>
            <Modal show={showPopUp} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            userInUse
                            ? <p>User exists!</p>
                            : <p>Successful!</p>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        userInUse
                        ? <p>Please use a different E-Mail!</p>
                        : <p>You can login now!</p>
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}