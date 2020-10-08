import React, {Component} from 'react'
import {fetchDistributionZonesFromServer} from '../../../store/location'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class GardenBox extends Component {
  constructor() {
    super()
    this.state = {
      singleGardenView: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getDistributionZones()
  }

  handleClick() {
    this.setState({singleGardenView: true})
  }
  render() {
    const zoneIndex = this.props.distributionZones.find(
      zone => zone.id === this.props.garden.distributionZoneId
    )

    if (zoneIndex === undefined) {
      return <div>.</div>
    } else if (
      this.state.singleGardenView === false &&
      zoneIndex !== undefined
    ) {
      return (
        <div id="single-garden">
          <div onClick={this.handleClick}>
            <div id="single-garden-container">
              <div className="single-garden-container-details">
                {this.props.garden.name}
              </div>
              <div className="single-garden-container-details">
                Location: {zoneIndex.name}
              </div>
              <div className="single-garden-container-details">
                Created: {this.props.garden.createdAt.substring(0, 10)}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Redirect
          to={{
            pathname: `/my-gardens/${this.props.garden.id}`,
            state: {
              garden: this.props.garden,
              zoneName: zoneIndex.name,
              twdgCode: zoneIndex.twdgCode
            }
          }}
        />
      )
    }
  }
}

const mapState = state => {
  return {
    distributionZones: state.distributionZonesReducer.distributionZones
  }
}

const mapDispatch = dispatch => {
  return {
    getDistributionZones: () => dispatch(fetchDistributionZonesFromServer())
  }
}

export default connect(mapState, mapDispatch)(GardenBox)
