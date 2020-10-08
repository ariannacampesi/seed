import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {fetchDistributionZonesFromServer} from '../../store/location'

class LocationForm extends Component {
  constructor() {
    super()
    this.state = {
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const {getDistributionZones} = this.props
    getDistributionZones()
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value, submitted: true})
  }

  render() {
    const {distributionZones} = this.props
    if (!this.state.submitted) {
      return (
        <form id="location-form" onSubmit={this.handleSubmit}>
          <label id="location">
            Select a location to see plants grown in that area.
          </label>
          <select
            className="location-select"
            name="twdgCode"
            onChange={this.handleChange}
          >
            <option value="none" defaultValue="selected">
              location
            </option>
            {distributionZones.map((zone, index) => (
              <option value={zone.twdgCode} key={index}>
                {zone.name}
              </option>
            ))}
          </select>
          <button id="submit-location-form" type="submit">
            Submit
          </button>
        </form>
      )
    } else {
      return <Redirect to={`/plants/in-zone/${this.state.twdgCode}`} />
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
    getDistributionZones: distributionZones =>
      dispatch(fetchDistributionZonesFromServer(distributionZones))
  }
}

export default connect(mapState, mapDispatch)(LocationForm)
