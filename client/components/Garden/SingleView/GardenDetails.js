import React, {Component} from 'react'

class GardenDetails extends Component {
  render() {
    return (
      <div id="garden-title">
        <h3>{this.props.garden.name}</h3>
        <h7>Location: {this.props.zoneName}</h7>
      </div>
    )
  }
}

export default GardenDetails
