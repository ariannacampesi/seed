import React, {Component} from 'react'
import Grid from './Grid'
import {fetchGardenFromServer} from '../../../store/garden'
import {fetchDistributionZoneFromServer} from '../../../store/location'
import {fetchPlantsInGarden} from '../../../store/plant'
import {connect} from 'react-redux'
import GardenDetails from './GardenDetails'
import {Redirect} from 'react-router-dom'

class SingleGardenView extends Component {
  constructor() {
    super()
    this.state = {
      addPlants: false,
      plantsInGarden: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {plants} = this.props.history.location.state.garden
    console.log(plants)
    this.props.getPlantsInGarden(plants)
  }

  handleClick() {
    this.setState({addPlants: true})
  }

  render() {
    console.log('this.props in render', this.props)
    console.log('this.state in redner', this.state)
    if (this.state.addPlants === false) {
      return (
        <div>
          <div id="single-garden-view">
            <div id="single-garden-details-div">
              <GardenDetails
                garden={this.props.history.location.state.garden}
                zoneName={this.props.history.location.state.zoneName}
              />
              {this.props.history.location.state.garden.plants.length > 0 ? (
                <div>
                  {this.props.gardenPlants.map((plant, index) => (
                    <div key={index}>{plant.data.common_name}</div>
                  ))}
                </div>
              ) : (
                <div>NO PLANTS</div>
              )}
              <button
                type="button"
                className="add-plants-button"
                onClick={this.handleClick}
              >
                Add Plants
              </button>
            </div>
            <Grid size={this.props.location.state.garden.size} />
          </div>
        </div>
      )
    } else {
      return (
        <Redirect
          to={{
            pathname: `/plants/in-zone/${this.props.location.state.twdgCode}`,
            state: {
              gardenId: this.props.location.state.garden.id,
              chooseDifferentLocation: false
            }
          }}
        />
      )
    }
  }
}

const mapState = state => {
  console.log(state)
  return {
    garden: state.gardenReducer.garden,
    distributionZone: state.distributionZonesReducer.distributionZone,
    gardenPlants: state.plantsReducer.gardenPlants
  }
}

const mapDispatch = dispatch => {
  return {
    getGarden: id => dispatch(fetchGardenFromServer(id)),
    getDistributionZone: id => dispatch(fetchDistributionZoneFromServer(id)),
    getPlantsInGarden: plants => dispatch(fetchPlantsInGarden(plants))
  }
}

export default connect(mapState, mapDispatch)(SingleGardenView)
