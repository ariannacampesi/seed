import React, {Component} from 'react'
import {fetchDistributionZoneFromServer} from '../../store/location'
import {connect} from 'react-redux'

class SingleViewDetails extends Component {
  async componentDidMount() {
    const {distributionZoneId} = this.props.garden
    await this.props.getDistributionZone(distributionZoneId)
  }

  render() {
    console.log('details', this.props)
    return (
      <div id="garden-title">
        <h3>Garden# {this.props.garden.id}</h3>
        <h4>Location: {this.props.distributionZone.name}</h4>
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

export default connect(mapState, mapDispatch)(SingleViewDetails)
