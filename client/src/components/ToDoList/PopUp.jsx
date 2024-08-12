import { Button, Modal, Form, Alert } from 'react-bootstrap'
import React, { useState, useContext } from 'react'
import {AuthContext} from '../../contexts/AuthContext'
export function PopUp(props){
  const { auth } = useContext(AuthContext)
  const [itemContent, setItemContent] = useState({
    title: "",
    text: "",
    type: "Work",
    authorId: auth.data.id
  })
  const [showAlert, setShowAlert] = useState(false)
  const handleClose = (e) => {
    props.action()
    setItemContent({...itemContent, text: "", title: "", type: "Work"})
  }
  const handleChangeItemContent = field => e => {
    if(field === "title") setItemContent({...itemContent, title: e.target.value})
    else if (field === "text") setItemContent({...itemContent, text: e.target.value})
    else if (field === "type") setItemContent({...itemContent, type: e.target.value})
    console.log({itemContent})
  }
  const checkIfEmpty = (field, method) => {
    var placeh = "Type" + field + " in here.."
    const requiredTextContainer = (cssClass) => {
      return (
        <Form.Control
          className={cssClass}
          type="textarea"
          placeholder={placeh}
          onChange={handleChangeItemContent(method)}
        />
      )
    }
    if(field === "" && method === "text") {
      return(
        <div>
          {requiredTextContainer("requiredField")}
          <p className="positionRequiredFieldText">Required!</p>
        </div>
      )
    } else if (field !== "" && method === "text"){
      return (
        <div>
          {requiredTextContainer()}
        </div>
      )
    } else if (field === "" && method === "title") {
      return (
        <div>
          {requiredTextContainer("requiredField")}
          <p className="positionRequiredFieldText">Required!</p>
        </div>
      )
    } else if (field !== "" && method === "title"){
      return (
        <div>
          {requiredTextContainer()}
        </div>
      )
    }
  }
  const addItem = async () => {
    if(itemContent.text === "" || itemContent.title === "") {
      setShowAlert(prevState => !prevState)
    }
    else{
      await fetch('http://localhost:9000/todos/create-todo', {
        method: "POST",
        body: JSON.stringify({
          title: itemContent.title,
          authorId: itemContent.authorId,
          text: itemContent.text,
          type: itemContent.type
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(setShowAlert(prevState => false))
      .then(props.action)
      .then(setItemContent({...itemContent, text: "", title: "", type: "Work"}))
    }
  }
  return(
    <Modal show={props.showPopUp} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            {checkIfEmpty(itemContent.title, "title")}
          </Form.Group>
          <Form.Group>
            <Form.Label>ToDo:</Form.Label>
              {checkIfEmpty(itemContent.text, "text")}
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Type:</Form.Label>
            <Form.Control as="select" onClick={handleChangeItemContent("type")}>
              <option>Work</option>
              <option>University</option>
              <option>No type</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      {
        showAlert
          ? <Alert variant="danger">Fill in the required Fields!</Alert>
          : <></>
      }
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addItem}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
