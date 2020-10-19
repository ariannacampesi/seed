import React, {useState} from 'react'
import {connect} from 'react-redux'
import {fetchPlant} from '../../../store/plant'

const Grid = props => {
  const {size} = props
  console.log('props in Grid', props)
  let {gardenPlants} = props
  console.log('gardenPlants', gardenPlants)
  let squareRoot = Math.floor(Math.sqrt(size)) //12.24
  let rows = squareRoot
  let columns = squareRoot

  const tr = []
  for (let r = 0; r < rows; r++) {
    const td = []
    for (let c = 0; c < columns; c++) {
      td.push(
        <td onClick={props.props} key={`${r},${c}`} id={`${r},${c}`}>
          {gardenPlants.map(
            plant =>
              plant.coordinates && plant.coordinates === `${r},${c}`
                ? plant.name
                : ''
          )}
        </td>
      )
    }
    tr.push(<tr key={r}>{td}</tr>)
  }

  return (
    <div id="grid-details">
      <table>
        <tbody id="grid">{tr}</tbody>
      </table>
      <div id="details">
        <div>Total Square Footage: {props.size}</div>
        <div>Remaining Square Footage</div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    plant: state.plantsReducer.plant
  }
}

const mapDispatch = dispatch => {
  return {
    getPlant: id => dispatch(fetchPlant(id))
  }
}
export default connect(mapState, mapDispatch)(Grid)
