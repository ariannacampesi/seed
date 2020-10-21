import React, {Component} from 'react'
import {fetchPlant} from '../../../store/plant'
import {addPlantToGardenOnServer} from '../../../store/garden'
import {connect} from 'react-redux'
import {Accordion, Card, Button} from 'react-bootstrap'
import About from './About'
import Specs from './Specs'
import {CSSTransition} from 'react-transition-group'
import {Redirect} from 'react-router-dom'

class SinglePlant extends Component {
  constructor() {
    super()
    this.state = {
      addPlants: false,
      loading: true,
      goToGarden: false,
      goBackToPlants: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleGoToGarden = this.handleGoToGarden.bind(this)
  }

  async componentDidMount() {
    const {id} = this.props
    const {getPlant} = this.props
    await getPlant(id)
    console.log('this.props', this.props)
    this.setState({loading: false})
  }

  async handleClick() {
    console.log('this.props in single-plant', this.props)
    const plant = {
      plantId: +this.props.id,
      quantity: 1,
      coordinates: this.props.cellId,
      name: this.props.plant.common_name,
      status: this.props.cellStatus
    }
    await this.props.addPlantToGarden(this.props.gardenId, plant)
    this.setState({addPlants: true})
  }

  handleGoToGarden() {
    this.setState({goToGarden: true})
  }

  render() {
    const {plant} = this.props
    console.log('this.props in render', this.props)

    if (this.state.loading === true)
      return (
        <CSSTransition
          in={true}
          timeout={{appear: 0, enter: 0, exit: 300}}
          classNames="roll"
          appear
        >
          <div>
            <h1 className="loading">loading plant details...</h1>
          </div>
        </CSSTransition>
      )

    if (this.state.goToGarden === true) {
      return <Redirect to={`/my-gardens/${this.props.gardenId}`} />
    }

    if (this.state.addPlants === false && this.state.loading === false) {
      return (
        <CSSTransition
          in={true}
          timeout={{appear: 0, enter: 0, exit: 300}}
          classNames="roll"
          appear
        >
          <div id="single-plant-view">
            <div id="single-plant-view-common_name">
              {plant.common_name.toLowerCase()}
            </div>
            <div id="single-plant-view-details">
              <img src={plant.image_url} height={40} width={40} />
              <div id="single-plant-view-specs">
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        about
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <About plant={this.props.plant} />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        specs
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <Specs plant={this.props.plant} />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    {/* <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="3">
                        how to grow
                      </Accordion.Toggle>
                    </Card.Header> */}
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>body</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                <div>
                  <button
                    type="button"
                    id="add-to-garden-button"
                    value={plant.id}
                    onClick={this.handleClick}
                  >
                    {' '}
                    + add to garden
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      )
    } else {
      return (
        <CSSTransition
          in={true}
          timeout={{appear: 0, enter: 0, exit: 300}}
          classNames="roll"
          appear
        >
          <div id="sucessfully-added-div">
            <div id="successfully-added">
              {plant.common_name} successfully added!
            </div>
            <button
              type="button"
              id="go-to-garden-button"
              onClick={this.handleGoToGarden}
            >
              > go to garden >
            </button>
          </div>
        </CSSTransition>
      )
    }
  }
}

const mapState = state => {
  return {
    plant: state.plantsReducer.plant,
    gardenPlant: state.gardenReducer.gardenPlant
  }
}

const mapDispatch = dispatch => {
  return {
    getPlant: id => dispatch(fetchPlant(id)),
    addPlantToGarden: (gardenId, plantId) =>
      dispatch(addPlantToGardenOnServer(gardenId, plantId))
  }
}
export default connect(mapState, mapDispatch)(SinglePlant)
