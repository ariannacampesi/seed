import React, {Component} from 'react'
import {fetchPlantsInZone} from '../../store/plant'
import {connect} from 'react-redux'
import {SinglePlant} from '../index'

class PlantList extends Component {
  constructor() {
    super()
    this.state = {
      singlePlantView: false,
      singlePlantId: '',
      loading: true
    }
  }
  componentDidMount() {
    const {zone} = this.props
    const {preference} = this.props
    console.log('zone in plant-list', zone)
    this.props.getPlantsInZone(zone, preference)
    this.setState({loading: false})
  }

  render() {
    console.log('this.props.celLId in PlantList', this.props)
    while (this.state.loading === true)
      return (
        <div>
          <h1 className="loading">loading plants...</h1>
        </div>
      )

    if (!this.state.singlePlantView && !this.state.loading) {
      console.log('this.props.plants', this.props.plants)
      console.log(
        'this.props.plants.map',
        this.props.plants.map(plant => plant)
      )
      const filtered = this.props.plants.filter(
        (v, i, a) => a.findIndex(t => t.id === v.id && t.id === v.id) === i
      )
      return (
        <div id="plant-list">
          {filtered.map(plant => (
            <div
              id="plant-in-plant-list"
              key={plant.id}
              onClick={() =>
                this.setState({
                  singlePlantView: true,
                  singlePlantId: plant.id
                })
              }
            >
              <div id="plant-in-plant-list-name">
                {plant.common_name !== null ? (
                  <div>{plant.common_name.toLowerCase()}</div>
                ) : (
                  <div>{plant.scientific_name.toLowerCase()}</div>
                )}
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
            {'<'} changed mind
          </button>
          <SinglePlant
            id={this.state.singlePlantId}
            gardenId={this.props.gardenId}
            cellId={this.props.cellId}
            cellStatus={this.props.cellStatus}
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
    getPlantsInZone: (zone, preference) =>
      dispatch(fetchPlantsInZone(zone, preference))
  }
}
export default connect(mapState, mapDispatch)(PlantList)
