import React, {Component} from 'react'
import {fetchPlantsInZone} from '../../store/plant'
import {connect} from 'react-redux'
import {SinglePlant} from '../index'

class PlantList extends Component {
  constructor() {
    super()
    this.state = {
      singlePlantView: false,
      singlePlantId: ''
    }
  }
  componentDidMount() {
    const {zone} = this.props
    this.props.getPlantsInZone(zone)
  }

  render() {
    const {isLoadingPlants} = this.props

    if (isLoadingPlants)
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )

    if (!this.state.singlePlantView) {
      return (
        <div>
          {this.props.plants.data.map((plant, index) => (
            <div
              key={index}
              id={plant.id}
              onClick={() =>
                this.setState({
                  singlePlantView: true,
                  singlePlantId: plant.id
                })
              }
            >
              <div id={plant.id}>{plant.common_name}</div>
              <img id={plant.id} height={40} width={40} src={plant.image_url} />
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div>
          <button
            type="button"
            onClick={() => this.setState({singlePlantView: false})}
          >
            Back to Results
          </button>
          <SinglePlant id={this.state.singlePlantId} />
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    plants: state.plantsReducer.plants,
    isLoadingPlants: state.plantsReducer.isLoadingPlants
  }
}

const mapDispatch = dispatch => {
  return {
    getPlantsInZone: zone => dispatch(fetchPlantsInZone(zone))
  }
}
export default connect(mapState, mapDispatch)(PlantList)
