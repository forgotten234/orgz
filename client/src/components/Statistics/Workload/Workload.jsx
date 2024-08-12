import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState, useContext } from "react"
import { Button } from 'react-bootstrap'
import '../styles.css'
import {DataForm} from './DataForm'
import {AuthContext} from '../../../contexts/AuthContext'

/*
  ToDo: Create just 1 class for both diagramms
        Create more components(each chart for example)
*/
export function Workload(){
  const [chartData, setChartData] = useState({})
  const [formType, setFormType] = useState(true)
  const [modulAdded, setModulAdded] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const { auth } = useContext(AuthContext)

  //generell Options for Chart
  var chartOptions = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  /*
    For some reason we have to fill in a seprate Object first
    and then update the chart. I do not exactly know why.
    I guess it has something to do with initialisation of
    react and chartjs. Chartjs is faster.
  */
  var chartDataForFilling = {
    labels: [],
    datasets: [{
      labels: [],
      data: [],
      backgroundColor: []
    }]
  }
  var randomColor = require('randomcolor'); // import the script
  const getModuls = async () => {
    await fetch('http://localhost:9000/workloads/get-workloads/' + auth.data.id)
      .then(response => response.json())
      .then(data => data.map(content => {
        let color = randomColor({
          luminosity: 'light',
          hue: 'blue'
        })
        chartDataForFilling.datasets[0].data.push(content.workload)
        chartDataForFilling.datasets[0].labels.push(content.modul)
        chartDataForFilling.datasets[0].backgroundColor.push(color)
        chartDataForFilling.labels.push(content.modul)
      }))
      .then(updateChartWithNewData)
  }
  const showRemoveFormContainer = () => {
    setFormType(true)
    setShowForm(prevState => !prevState)
  }
  const showSendFormContainer = () => {
    setFormType(false)
    setShowForm(prevState => !prevState)
  }
  const showOrCloseFormContainer = () => {
    setShowForm(prevState => !prevState)
  }
  const updateChartWithNewData = () => {
    setChartData(chartDataForFilling)
  }
  const handleModulAddedOrRemoveCallback = e => {
    setModulAdded(prevState => prevState + 1)
    setShowForm(prevState => !prevState)
  }

  useEffect(() => {
    getModuls()
  }, [modulAdded])

  return(
    <div className='statisticsContainer'>
      <h4>Workload in SWS:</h4>
      <Bar data={chartData} options={chartOptions} />
        {
          showForm
          ?
            formType
            ? <DataForm actionSendOrRemove={handleModulAddedOrRemoveCallback} actionClose={showOrCloseFormContainer} remove={"false"}/>
            : <DataForm actionSendOrRemove={handleModulAddedOrRemoveCallback} actionClose={showOrCloseFormContainer} remove={"true"}/>
          : <>
              <div className='buttonContainerChart'>
                <div className='buttonsChart'>
                  <Button className="button" onClick={showRemoveFormContainer}>Add Modul</Button>
                  <Button className="button" onClick={showSendFormContainer}>Remove</Button>
                </div>
              </div>
            </>
          }
    </div>
  )
}
