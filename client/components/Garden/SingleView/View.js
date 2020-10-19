import React, {Component} from 'react'
import Grid from './Grid'
import {fetchGardenFromServer} from '../../../store/garden'
import {fetchDistributionZoneFromServer} from '../../../store/location'
import {fetchPlantsInGarden} from '../../../store/plant'
import {connect} from 'react-redux'
import GardenDetails from './GardenDetails'
import {Redirect} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'

class SingleGardenView extends Component {
  constructor() {
    super()
    this.state = {
      addPlants: false,
      plantsInGarden: [],
      cellId: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.getGarden(this.props.match.params.gardenId)
    console.log('this.props in singleGardenView', this.props)
    const {plants} = this.props.garden
    await this.props.getDistributionZone(this.props.garden.distributionZoneId)
    console.log(plants)
    console.log('dist', this.props)
    await this.props.getPlantsInGarden(plants)
  }

  handleClick(event) {
    this.setState({addPlants: true, cellId: event.target.id})
    console.log('the id of the cell clicked is', event.target.id)
  }

  render() {
    console.log('this.props in render', this.props)
    console.log('this.state in redner', this.state)
    if (this.props.isLoadingPlants) {
      return (
        <CSSTransition
          in={true}
          timeout={{appear: 0, enter: 0, exit: 300}}
          classNames="roll"
          appear
        >
          <div className="loading">loading garden details...</div>
        </CSSTransition>
      )
    }
    if (
      this.state.addPlants === false &&
      this.props.isLoadingPlants === false
    ) {
      return (
        <CSSTransition
          in={true}
          timeout={{appear: 0, enter: 0, exit: 300}}
          classNames="roll"
          appear
        >
          <div>
            <div id="single-garden-view">
              <div id="single-garden-details-div">
                <GardenDetails garden={this.props.garden} zoneName="La" />
                <div className="plants-in-garden">plants in garden:</div>
                {this.props.garden.plants.length > 0 ? (
                  <div>
                    {this.props.gardenPlants.map((plant, index) => (
                      <li key={index} className="plants-in-garden">
                        {plant.data.common_name}
                      </li>
                    ))}
                  </div>
                ) : (
                  <div className="plants-in-garden">
                    currently no plants in this garden
                  </div>
                )}
                {/* <button
                  type="button"
                  className="add-plants-button"
                  onClick={this.handleClick}
                >
                  add plants
                </button> */}
              </div>
              <Grid
                size={this.props.garden.size}
                props={this.handleClick}
                gardenPlants={this.props.garden.plants}
              />
            </div>
          </div>
        </CSSTransition>
      )
    } else {
      return (
        <Redirect
          to={{
            pathname: `/plants/in-zone/${this.props.distributionZone.twdgCode}`,
            state: {
              // preference: this.props.location.state.garden.plantType,
              gardenId: this.props.garden.id,
              chooseDifferentLocation: false,
              cellId: this.state.cellId
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
    gardenPlants: state.plantsReducer.gardenPlants,
    gardenPlant: state.gardenReducer.gardenPlant,
    isLoadingPlants: state.plantsReducer.isLoadingPlants
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
