//React
import React, { useEffect, useState, useContext } from "react"
import {AuthContext} from '../../../contexts/AuthContext'

import '../styles.css'

//bootstrap
import { Button, Form, Dropdown } from 'react-bootstrap'
/*
  ToDo: Create just 1 class for both forms
        Create more components (each form (remove & send))
*/
export function DataForm(props){
  const { auth } = useContext(AuthContext)
  const [modulInformation, setModulInformation] = useState({
    authorId: auth.data.id,
    modul: "",
    workload: 0,
  })
  const [dropDownMap, setDropDownMap] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const addModul = async () => {
    await fetch('http://localhost:9000/workloads/create-workload', {
      method: "POST",
      body: JSON.stringify({
        authorId: modulInformation.authorId, //equals Account Id
        modul: modulInformation.modul,
        workload: modulInformation.workload
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
    if(field === "modul") setModulInformation({...modulInformation, modul: e.target.value})
    else setModulInformation({...modulInformation, workload: e.target.value})
  }

  const removeModul = async () => {
    await fetch('http://localhost:9000/workloads/delete-workload/' + selectedOption, {
      method: "DELETE"
    })
    .then(props.actionSendOrRemove)
  }

  const getModulsWithId = async () => {
    await fetch('http://localhost:9000/workloads/get-workloads/' + modulInformation.authorId)
      .then(response => response.json())
      .then(data => setDropDownMap(data.map(content =>
        <Dropdown.Item onClick={handleSelect} id={content._id} key={content._id}>{content.modul}</Dropdown.Item>
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
              <div className="textDataFrom">Workload:</div><Form.Control type="textarea" onChange={onChangeModulContentForm("workload")}/>
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
