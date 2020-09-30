import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {PlantList} from '../index'

const PlantsInZone = props => {
  const [goBack, setGoBack] = useState(false)
  const handleClick = () => {
    setGoBack(true)
  }

  if (goBack === false) {
    return (
      <div>
        <button type="submit" onClick={handleClick}>
          Choose Different Location
        </button>
        <PlantList zone={props.match.params.locationId} />
      </div>
    )
  } else {
    return <Redirect to="/plants/in-zone" />
  }
}

export default PlantsInZone
