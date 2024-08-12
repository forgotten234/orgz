import React, { useEffect, useState, useContext } from "react"
import { Button } from 'react-bootstrap'
import '../styles.css'
import '../../../helpers/CenteredTextDoughnut.js'
import {Doughnut} from 'react-chartjs-2'
import {DataForm} from './DataForm'
import {AuthContext} from '../../../contexts/AuthContext'

export function Grade() {
  const [chartData, setChartData] = useState({})
  const [modulAdded, setModulAdded] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState(true)
  const { auth } = useContext(AuthContext)
  //generell Options for Chart
  var chartOptions = {
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var index = tooltipItem.index;
          return dataset.labels[index] + ': ' + dataset.data[index];
        }
      }
    }
  }

  /*
    For some reason we have to fill in a seprate Object first
    and then update the chart. I do not exactly know why.
    I guess it has something to do with initialisation of
    react and chartjs. Chartjs is faster.
  */
  var chartDataForFilling = {
    datasets: [{/*Empty Objects for correct label creation*/},
    {
      weight: 50,
      data: [],
      backgroundColor: [],
      labels: []
    },
    {
      weight: 50,
      data: [],
      backgroundColor: [],
      labels: []
    }],
  }
  var randomColor = require('randomcolor'); // import the script
  const getModuls = async () => {
    await fetch('http://localhost:9000/grades/get-grades/' + auth.data.id)
      .then(response => response.json())
      .then(data => data.map(content => {
        let color = randomColor({
          luminosity: 'light',
          hue: 'blue'
        })
        chartDataForFilling.datasets[1].data.push(content.credits)
        chartDataForFilling.datasets[1].labels.push(content.nameCredits + ", Credits")
        chartDataForFilling.datasets[1].backgroundColor.push(color)
        chartDataForFilling.datasets[2].data.push(content.grade)
        chartDataForFilling.datasets[2].labels.push(content.nameGrades + ", Grade")
        chartDataForFilling.datasets[2].backgroundColor.push(color)
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

  //Component changes -> Item Added
  useEffect(() => {
    getModuls()
  }, [modulAdded])

  return(
    <div>
      <h4>Your Grade till now:</h4>
      <Doughnut data={chartData} datasetKeyProvider={() => {return Math.random()}} options={chartOptions}/>
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
