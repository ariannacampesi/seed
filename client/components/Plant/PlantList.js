import React, {Component, useEffect} from 'react'
import {fetchPlantsInZone} from '../../store/plant'
import {connect} from 'react-redux'
import {SinglePlant} from '../index'
import useLocalStorageState from 'use-local-storage-state'

class PlantList extends Component {
  constructor() {
    super()
    this.state = {
      singlePlantView: false,
      singlePlantId: '',
      dataStored: false,
      index: 0,
      storedPlants: [],
      loading: true
    }
  }

  async componentDidMount() {
    const {zone} = this.props
    const index = this.props.plants.findIndex(plant => plant.zone === zone)
    try {
      if (index === -1) {
        await this.props.getPlantsInZone(zone)
      } else {
        this.setState({
          dataStored: true,
          storedPlants: this.props.plants[index]
        })
      }
    } catch (err) {
      console.log(err)
    }
    this.setState({loading: false})
  }

  render() {
    const {zone} = this.props
    console.log('state in component did mount', this.state)
    console.log(
      'trying to access plants array',
      this.props.plants.findIndex(plant => plant.zone === zone)
    )
    console.log('this.props.celLId in PlantList', this.props)
    if (this.state.loading === true)
      return (
        <div>
          <h1 className="loading">loading plants...</h1>
        </div>
      )

    if (!this.state.singlePlantView && !this.state.loading) {
      const plants =
        this.state.dataStored === true
          ? this.state.storedPlants.plants
          : this.props.plants[this.props.plants.length - 1].plants
      console.log('plants', plants)
      const filtered = plants.filter(
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
    getPlantsInZone: zone => dispatch(fetchPlantsInZone(zone))
  }
}
export default connect(mapState, mapDispatch)(PlantList)
