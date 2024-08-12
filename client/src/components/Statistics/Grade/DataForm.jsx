//React
import React, { useEffect, useState, useContext } from "react"
import {AuthContext} from '../../../contexts/AuthContext'

import '../styles.css'

//bootstrap
import { Button, Form, Dropdown } from 'react-bootstrap'

export function DataForm(props){
  const { auth, setAuthData } = useContext(AuthContext)
  const [modulInformation, setModulInformation] = useState({
    authorId: auth.data.id,
    nameGrades: "",
    nameCredits: "",
    credits: 0,
    grade: 0.0
  })
  const [dropDownMap, setDropDownMap] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const addModul = async () => {
    await fetch('http://localhost:9000/grades/create-grade', {
      method: "POST",
      body: JSON.stringify({
        authorId: modulInformation.authorId, //equals Account Id
        nameCredits: modulInformation.nameCredits,
        nameGrades: modulInformation.nameGrades,
        credits: modulInformation.credits,
        grade: modulInformation.grade
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(props.actionSendOrRemove)
  }

  const handleSelect = e => {
    setSelectedOption(e.target.id);
  }

  const onChangeModulContentForm = field => e => {
    if(field === "modul") setModulInformation({...modulInformation, nameGrades: e.target.value, nameCredits: e.target.value})
    else if(field === "credits") setModulInformation({...modulInformation, credits: e.target.value})
    else if(field === "grade") setModulInformation({...modulInformation, grade: e.target.value})
  }

  const removeModul = async () => {
    await fetch('http://localhost:9000/grades/delete-grade/' + selectedOption, {
      method: "DELETE"
    })
    .then(props.actionSendOrRemove)
  }

  const getModulsWithId = async () => {
    await fetch('http://localhost:9000/grades/get-grades/' + modulInformation.authorId)
      .then(response => response.json())
      .then(data => setDropDownMap(data.map(content =>
        <Dropdown.Item onClick={handleSelect} id={content._id} key={content._id}>{content.nameGrades}</Dropdown.Item>
      )))
  }

  useEffect(() => {
    getModulsWithId()
  }, [])

  return(
    <div>
      {
        props.remove === "false"
        ?
          <div className="dataForm">
            <Button className="button" onClick={addModul}>Send</Button>
            <Button className="button" onClick={props.actionClose}>Close</Button>
            <Form>
              <div className="textDataFrom">Modul:</div><Form.Control type="textarea" onChange={onChangeModulContentForm("modul")}/>
              <div className="textDataFrom">Credits:</div><Form.Control type="textarea" onChange={onChangeModulContentForm("credits")}/>
              <div className="textDataFrom">Grade:</div><Form.Control type="textarea" onChange={onChangeModulContentForm("grade")}/>
            </Form>
          </div>
        :
          <div className="dataForm">
            <Button className="button" onClick={removeModul}>Remove selected</Button>
            <Button className="button" onClick={props.actionClose}>Close</Button>
            <Dropdown className="dropDownMenu">
              <Dropdown.Toggle>
                Select
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {dropDownMap}
              </Dropdown.Menu>
            </Dropdown>
          </div>
      }
    </div>
  )
}
