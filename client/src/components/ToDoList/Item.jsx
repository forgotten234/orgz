//React
import React, { useEffect,
  useState } from "react"

import './styles.css'

//bootstrap
import { Button,
  Card,
  Form } from 'react-bootstrap'

export function Item(props){
  const [cardType, setCardType] = useState('')
  const handleDeleteCallback = async () => {
    await fetch('http://localhost:9000/todos/delete-todo/' + props.id, {
      method: 'DELETE',
    })
    .then(props.action)
  }
  useEffect(() => {
    if(props.type === "University"){
      setCardType(prevCardType => 'primary')
    } else if (props.type === "Work") {
      setCardType(prevCardType => 'success')
    } else {
      setCardType(prevCardType => 'danger')
    }
  }, [])

  return (
    <Card className="cardMain" bg={cardType}>
      <Card.Header>{props.title}</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="cardBody">
            {props.text}
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Button variant={'outline-light'} onClick={handleDeleteCallback}>Delete</Button>
      </Card.Footer>
    </Card>
  )
}
