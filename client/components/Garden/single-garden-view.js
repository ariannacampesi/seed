import React, {Component} from 'react'
import Grid from './grid'
import {fetchGardenFromServer} from '../../store/garden'
import {fetchDistributionZoneFromServer} from '../../store/location'
import {connect} from 'react-redux'
import SingleViewDetails from './single-view-details'

class SingleGardenView extends Component {
  componentDidMount() {
    const {gardenId} = this.props.match.params
    this.props.getGarden(gardenId)
  }

  render() {
    console.log('this props in render', this.props)
    return (
      <div id="single-garden-view">
        <SingleViewDetails garden={this.props.garden} />
        <Grid size={this.props.garden.size} />
      </div>
    )
  }
}

const mapState = state => {
  console.log(state)
  return {
    garden: state.gardenReducer.garden,
    distributionZone: state.distributionZonesReducer.distributionZone
  }
}

const mapDispatch = dispatch => {
  return {
    getGarden: id => dispatch(fetchGardenFromServer(id)),
    getDistributionZone: id => dispatch(fetchDistributionZoneFromServer(id))
  }
}

export default connect(mapState, mapDispatch)(SingleGardenView)
