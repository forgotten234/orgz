//React
import React from "react"

//bootstrap
import { Container, Row, Col } from 'react-bootstrap'

import {ToDoList} from '../../ToDoList/ToDoList'
import {EventList} from '../../Events/EventList'
import {Grade} from '../../Statistics/Grade/Grade'
import {Workload} from '../../Statistics/Workload/Workload'

import './styles.css'

export function Screen(){
  return(
    <div>
      <Container fluid>
        <Row>
          <Col className='col'>
            <ToDoList />
          </Col>
          <Col className='col'>
            <EventList />
          </Col>
          <Col className='col' xs={5}>
            <Grade />
            <br />
            <Workload />
            <br />
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
