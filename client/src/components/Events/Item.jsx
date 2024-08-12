//React
import React, { useEffect, useState } from "react"

import './styles.css'

//bootstrap
import { Button, Card, Form } from 'react-bootstrap'

export function Item(props){
  var [buttonClicked, setButtonClicked] = useState(false)
  var [cardBodyItem, setCardBodyItem] = useState("")
  var [buttonText, setButtonText] = useState("Show more")
  const onButtonClick = () => {
    setButtonClicked(prevButtonClicked => !prevButtonClicked)
  }

  const updateEvent = attribute => async e => {
    var bodyObj = {}
    if(attribute === "title") bodyObj = {title: e.target.value}
    else if (attribute === "date") bodyObj = {date: e.target.value}
    else if (attribute === "information") bodyObj = {information: e.target.value}
    else if (attribute === "type") bodyObj = {type: e.target.value}
    else if (attribute === "location") bodyObj = {location: e.target.value}
    await fetch('http://localhost:9000/events/update-event/' + props.id, {
      method: 'PATCH',
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(props.action())
    .then(json => console.log(json))
  }

  useEffect(() => {
    if(buttonClicked){
      setButtonText(prevButtonText => "Show less")
      setCardBodyItem(prevCardBodyItem =>
          <Card.Body>
            <Card.Text>
              <div>
                Type:<Form.Control
                      type="textarea"
                      placeholder={props.type}
                      className="textAreaRight"
                      onChange={updateEvent('type')}/>
              </div>
              <br />
              <div>
                Information: <Form.Control
                      type="textarea"
                      placeholder={props.information}
                      className="textAreaRight"
                      onChange={updateEvent('information')}/>
              </div>
              <br />
              <div>
                Location: <Form.Control
                      type="textarea"
                      placeholder={props.location}
                      className="textAreaRight"
                      onChange={updateEvent('location')}/>
              </div>
            </Card.Text>
          </Card.Body>
      )
    }
    else{
      setCardBodyItem(prevCardBodyItem => "")
      setButtonText(prevButtonText => "Show more")
    }
  }, [buttonClicked])

  return(
    <Card className="cardMain" bg={'light'}>
      <Card.Header>
        <div className="textAreaLeft">
          Date: <br /><Form.Control
            type="textarea"
            placeholder={props.date}
            onChange={updateEvent('date')}/>
        </div>
        <div className="textAreaRight">
          Title: <br /><Form.Control type="textarea"
            placeholder={props.title}
            onChange={updateEvent('title')}/>
        </div>
      </Card.Header>
        {cardBodyItem}
      <Card.Footer>
        <Button
          variant={'outline-danger'}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Card.Footer>
    </Card>
  )

}
