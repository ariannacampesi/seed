import React, {Component} from 'react'
import {fetchPlant} from '../../store/plant'
import {addPlantToGardenOnServer} from '../../store/garden'
import {connect} from 'react-redux'

class SinglePlant extends Component {
  constructor() {
    super()
    this.state = {
      addPlants: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const {id} = this.props
    const {getPlant} = this.props
    await getPlant(id)
    console.log('this.props', this.props)
  }

  async handleClick() {
    await this.props.addPlantToGarden(this.props.gardenId, {
      plantId: +this.props.id
    })
    this.setState({addPlants: true})
  }

  render() {
    const {plant} = this.props
    console.log('this.props in render', this.props)
    // if (this.state.loading)
    //   return (
    //     <div>
    //       <h1>Loading...</h1>
    //     </div>
    //   )
    if (this.state.addPlants === false) {
      return (
        <div id="single-plant-view">
          <div>{plant.common_name}</div>
          <img src={plant.image_url} height={40} width={40} />
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
      )
    } else {
      return (
        <div id="sucessfully-added-div">
          <div id="successfully-added">
            {plant.common_name} successfully added!
          </div>
          <button type="button" id="go-to-garden-button">
            go to garden >
          </button>
        </div>
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
