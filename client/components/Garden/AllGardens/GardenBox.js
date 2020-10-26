import React, {Component} from 'react'
import {fetchDistributionZonesFromServer} from '../../../store/location'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class GardenBox extends Component {
  constructor(props) {
    super(props)
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
          <div>
            <div onClick={this.handleClick}>
              <div id="single-garden-container">
                <div className="single-garden-container-details">
                  {this.props.garden.name}
                </div>
                <div className="single-garden-container-details">
                  location: {zoneIndex.name}
                </div>
                <div className="single-garden-container-details">
                  created:{' '}
                  {this.props.garden.createdAt.substring(5, 10) +
                    '-' +
                    this.props.garden.createdAt.substring(0, 4)}
                </div>
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
    getDistributionZones: () => dispatch(fetchDistributionZonesFromServer()),
    deleteGarden: gardenId => dispatch(removeGardenFromServer(gardenId))
  }
}

export default connect(mapState, mapDispatch)(GardenBox)
