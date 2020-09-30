import React, {Component} from 'react'
import {fetchPlant} from '../../store/plant'
import {connect} from 'react-redux'

class SinglePlant extends Component {
  componentDidMount() {
    const {id} = this.props
    const {getPlant} = this.props
    getPlant(id)
  }

  render() {
    const {plant} = this.props

    // if (this.state.loading)
    //   return (
    //     <div>
    //       <h1>Loading...</h1>
    //     </div>
    //   )

    return (
      <div>
        <div>{plant.common_name}</div>
        <img src={plant.image_url} height={40} width={40} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    plant: state.plantsReducer.plant,
    isLoadingSinglePlant: state.plantsReducer.isLoadingSinglePlant
  }
}

const mapDispatch = dispatch => {
  return {
    getPlant: id => dispatch(fetchPlant(id))
  }
}
export default connect(mapState, mapDispatch)(SinglePlant)
