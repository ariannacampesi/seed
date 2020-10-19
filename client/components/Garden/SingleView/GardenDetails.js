import React, {Component} from 'react'

class GardenDetails extends Component {
  render() {
    return (
      <div id="garden-title">
        <div id="garden-name">{this.props.garden.name}</div>
        <div className="garden-details">location: {this.props.zoneName}</div>
        <div className="garden-details">
          plant type: {this.props.garden.plantType}
        </div>
      </div>
    )
  }
}

export default GardenDetails
