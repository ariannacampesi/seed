import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {PlantList} from '../index'

const PlantsInZone = props => {
  console.log('props', props)
  const [goBack, setGoBack] = useState(false)
  const chooseLocationOption = props.history.location.state
    ? props.history.location.state.chooseDifferentLocation
    : true
  const [chooseLocation, setChooseLocation] = useState(chooseLocationOption)
  const handleClick = () => {
    setGoBack(true)
  }
  if (goBack === false) {
    return (
      <div id="plants-in-zone">
        <div>
          {chooseLocation === true ? (
            <div>
              <button
                id="choose-different-location"
                type="submit"
                onClick={handleClick}
              >
                Change Location
              </button>
              <PlantList zone={props.match.params.locationId} />
            </div>
          ) : (
            <div>
              <PlantList
                zone={props.match.params.locationId}
                gardenId={props.history.location.state.gardenId}
              />
            </div>
          )}
        </div>
      </div>
    )
  } else {
    return <Redirect to="/plants/in-zone" />
  }
}

export default PlantsInZone
