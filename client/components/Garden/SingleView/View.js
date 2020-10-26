import React, {Component} from 'react'
import Grid from './Grid'
import {
  fetchGardenFromServer,
  removePlantFromGardenOnServer
} from '../../../store/garden'
import {fetchDistributionZoneFromServer} from '../../../store/location'
import {fetchPlantsInGarden} from '../../../store/plant'
import {connect} from 'react-redux'
import GardenDetails from './GardenDetails'
import {Redirect} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'
import {Accordion, Card, Button} from 'react-bootstrap'

class SingleGardenView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addPlants: false,
      plantsInGarden: [],
      cellId: '',
      cellStatus: 'inactive',
      plantDeleted: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleDeletePlant = this.handleDeletePlant.bind(this)
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
    this.setState({
      addPlants: true,
      cellId: event.target.id,
      cellStatus: 'active',
      update: false
    })
    console.log('the id of the cell clicked is', event.target.id)
  }

  handleDeletePlant(event) {
    this.updateState(event.target.value)
    this.props.deletePlantFromGarden(this.props.garden.id, event.target.value)
  }

  updateState(coordinates) {
    let index = this.props.garden.plants.findIndex(
      plant => plant.coordinates === coordinates
    )
    this.props.garden.plants.splice(index, 1)
    const data = this.props.garden.plants
    this.setState({plants: data, update: !this.state.update})
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
                <GardenDetails
                  garden={this.props.garden}
                  zoneName={this.props.distributionZone.name}
                />
                <div id="single-plant-view-specs">
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="1"
                        >
                          plants in garden
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          {this.props.garden.plants.length > 0 ? (
                            <div>
                              {this.props.garden.plants.map((plant, index) => (
                                <div key={index} className="plants-in-garden">
                                  <li>{plant.name.toLowerCase()}</li>
                                  <button
                                    type="button"
                                    onClick={this.handleDeletePlant}
                                    value={plant.coordinates}
                                  >
                                    x
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div>
                              There are currently no plants in this garden.
                              Click any box to start adding plants.
                            </div>
                          )}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
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
                handleDelete={this.handleDeletePlant}
                update={this.state.update}
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
              gardenId: this.props.garden.id,
              chooseDifferentLocation: false,
              cellId: this.state.cellId,
              cellStatus: this.state.cellStatus
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
    getPlantsInGarden: plants => dispatch(fetchPlantsInGarden(plants)),
    deletePlantFromGarden: (gardenId, coordinates) =>
      dispatch(removePlantFromGardenOnServer(gardenId, coordinates))
  }
}

export default connect(mapState, mapDispatch)(SingleGardenView)
