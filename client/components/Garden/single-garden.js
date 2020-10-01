import React, {Component} from 'react'
import './garden.css'
import {fetchDistributionZoneFromServer} from '../../store/location'
import {connect} from 'react-redux'

class SingleGarden extends Component {
  async componentDidMount() {
    const {distributionZoneId} = this.props.garden
    await this.props.getDistributionZone(distributionZoneId)
  }

  render() {
    return (
      <div id="single-garden">
        <a href={`/my-gardens/${this.props.garden.id}`}>
          <div id="single-garden-container">
            <div>Garden #{this.props.index + 1}</div>
            <div>Location {this.props.distributionZone.name}</div>
            <div>Created: {this.props.garden.createdAt.substring(0, 10)}</div>
          </div>
        </a>
      </div>
    )
  }
}

const mapState = state => {
  return {
    distributionZone: state.distributionZonesReducer.distributionZone
  }
}

const mapDispatch = dispatch => {
  return {
    getDistributionZone: id => dispatch(fetchDistributionZoneFromServer(id))
  }
}

export default connect(mapState, mapDispatch)(SingleGarden)
