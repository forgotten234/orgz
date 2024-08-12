//React
import React, { useEffect, useState, useContext } from 'react'
import {Item} from './Item'
import {PopUp} from './PopUp'
import { Button } from 'react-bootstrap'
import './styles.css'
import {AuthContext} from '../../contexts/AuthContext'

export function ToDoList(){
  const [showPopUp, setShowPopUp] = useState(false)
  const [itemMap, setItemMap] = useState([])
  const [itemAdded, setItemAdded] = useState(0)
  const { auth } = useContext(AuthContext)
  const handleDeleteCallback = e => setItemAdded(prevState => prevState + 1)
  const handleItemAddedCallback = e => {
    setItemAdded(prevState => prevState + 1)
    setShowPopUp(prevState => !prevState)
  }

  const deleteItems = async () => {
    await fetch('http://localhost:9000/todos/delete-todos/' + auth.data.id, {
      method: 'DELETE',
      body: JSON.stringify({
        authorId: auth.data.id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(setItemAdded(prevState => prevState + 1))
  }

  const getItems = async () => {
    await fetch('http://localhost:9000/todos/get-todos/' + auth.data.id)
      .then(response => response.json())
      .then(data => setItemMap(data.map(content =>
        <Item title={content.title} text={content.text} type={content.type} key={content._id} id={content._id} action={handleDeleteCallback}/>
      )))
  }

  //Component changes -> Item Added
  useEffect(() => {
    getItems()
  }, [itemAdded])

  return(
    <div className="toDoList">
      <Button className='button' onClick={() => {setShowPopUp(prevState => !prevState)}}>Add item</Button>
      <Button className='button' onClick={deleteItems}>Delete list</Button>
      {itemMap.reverse()}
      <PopUp action={handleItemAddedCallback} showPopUp={showPopUp}/>
    </div>
  )
}
