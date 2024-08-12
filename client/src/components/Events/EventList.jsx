//React
import React, { useEffect, useState, useContext } from 'react'
import {Item} from './Item'
import { Button } from 'react-bootstrap'
import {AuthContext} from '../../contexts/AuthContext'

export function EventList(){
  const [eventMap, setEventMap] = useState([])
  const [eventsChanged, setEventsChanged] = useState(0)
  const { auth} = useContext(AuthContext)
  const [eventContent, setEventContent] = useState({
    title: "",
    information: "",
    type: "Work",
    authorId: auth.data.id,
    location: "",
    date: ""
  })
  const handleEventsChangedCallback = e => setEventsChanged(prevState => prevState + 1)
  const deleteEvents = async () => {
    await fetch('http://localhost:9000/events/delete-events/' + eventContent.authorId, {
      method: 'DELETE',
      body: JSON.stringify({
        authorId: eventContent.authorId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(setEventsChanged(prevState => prevState + 1))
  }
  const addEvent = async () => {
    await fetch('http://localhost:9000/events/create-event', {
      method: "POST",
      body: JSON.stringify({
        title: eventContent.title,
        authorId: eventContent.authorId,
        information: eventContent.information,
        type: eventContent.type,
        location: eventContent.location,
        date: eventContent.date
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(setEventContent({...eventContent, text: "", title: "", type: "Work"}))
    .then(setEventsChanged(prevState => prevState + 1))
  }
  const getEvents = async () => {
    await fetch('http://localhost:9000/events/get-events/' + eventContent.authorId)
      .then(response => response.json())
      .then(data => setEventMap(data.map(content =>
        <Item
          title={content.title}
          date={content.date}
          information={content.information}
          type={content.type}
          key={content._id}
          id={content._id}
          location={content.location}
          action={handleEventsChangedCallback}
          />
      )))
  }
  useEffect(() => {
    getEvents()
  }, [eventsChanged])
  return(
    <div className="eventList">
      <Button className='button' onClick={addEvent}>Add item</Button>
      <Button className='button' onClick={deleteEvents}>Delete List</Button>
      {eventMap.reverse()}
    </div>
  )
}
