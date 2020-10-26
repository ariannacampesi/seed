import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {PlantList} from '../index'
import {CSSTransition} from 'react-transition-group'

const PlantsInZone = props => {
  console.log('props in PlantsInZone', props)
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
            <CSSTransition
              in={true}
              timeout={{appear: 0, enter: 0, exit: 300}}
              classNames="roll"
              appear
            >
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
            </CSSTransition>
          ) : (
            <CSSTransition
              in={true}
              timeout={{appear: 0, enter: 0, exit: 300}}
              classNames="roll"
              appear
            >
              <div>
                <PlantList
                  zone={props.match.params.locationId}
                  gardenId={props.history.location.state.gardenId}
                  cellId={props.location.state.cellId}
                  cellStatus={props.location.state.cellStatus}
                />
              </div>
            </CSSTransition>
          )}
        </div>
      </div>
    )
  } else {
    return <Redirect to="/plants/in-zone" />
  }
}

export default PlantsInZone
