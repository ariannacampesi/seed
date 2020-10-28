import React, {useState} from 'react'
import {connect} from 'react-redux'
import {fetchPlant} from '../../../store/plant'

const Grid = props => {
  const size = JSON.parse(props.size)
  console.log('props in Grid', props)
  let {gardenPlants} = props
  console.log('gardenPlants', gardenPlants)
  let rows = size.rows
  let columns = size.columns

  const [update, setUpdate] = useState(props.update)

  const tr = []
  for (let r = 1; r < rows + 1; r++) {
    const td = []
    for (let c = 1; c < columns + 1; c++) {
      td.push(
        <td onClick={props.props} key={`${r},${c}`} id={`${r},${c}`}>
          {gardenPlants.map(
            plant =>
              plant.coordinates && plant.coordinates === `${r},${c}`
                ? plant.name.toLowerCase()
                : ''
          )}
        </td>
      )
    }
    tr.push(<tr key={r}>{td}</tr>)
  }

  // console.log('TR ', tr)
  // const trProps = tr.map((element) => element.props)
  // console.log('TR PROPS', trProps)
  // const trChildren = trProps.map((props) => props.children)
  // console.log('TR CHILDREN', trChildren)
  // const trChildrenProps = trChildren.map((child) => child)
  // console.log('TR CHILDREN PROPS', trChildrenProps)
  // const trChildrenPropsArray = trChildrenProps.map((prop) => prop)
  // console.log('TR CHILDREN PROPS ARRAY', trChildrenPropsArray)
  return !update ? (
    <div id="grid-details">
      <table>
        <tbody id="grid">{tr}</tbody>
      </table>
      <div id="details">
        <div>Total Square Footage: {rows * columns}</div>
        <div>
          Remaining Square Footage: {rows * columns - gardenPlants.length}
        </div>
      </div>
    </div>
  ) : (
    <div id="grid-details">
      <table>
        <tbody id="grid">{tr}</tbody>
      </table>
      <div id="details">
        <div>Total Square Footage: {rows * columns}</div>
        <div>
          Remaining Square Footage: {rows * columns - gardenPlants.length}
        </div>
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
