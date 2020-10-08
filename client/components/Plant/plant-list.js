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
    console.log('zone in plant-list', zone)
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
      console.log('this.props.plants', this.props.plants)
      return (
        <div id="plant-list">
          {this.props.plants.data.map((plant, index) => (
            <div
              id="plant-in-plant-list"
              key={index}
              onClick={() =>
                this.setState({
                  singlePlantView: true,
                  singlePlantId: plant.id
                })
              }
            >
              <div id="plant-in-plant-list-name">
                {plant.common_name.toLowerCase()}
              </div>
              <img id="plant-in-plant-list-img" src={plant.image_url} />
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div>
          <button
            type="button"
            id="back-button"
            onClick={() => this.setState({singlePlantView: false})}
          >
            {' '}
            {'<'} go back
          </button>
          <SinglePlant
            id={this.state.singlePlantId}
            gardenId={this.props.gardenId}
          />
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
