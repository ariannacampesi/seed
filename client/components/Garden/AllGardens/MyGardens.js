import React, {Component} from 'react'
import GardenBox from './GardenBox'
import {fetchGardensFromServer} from '../../../store/garden'
import {connect} from 'react-redux'

class MyGardens extends Component {
  componentDidMount() {
    this.props.getGardens()
  }

  render() {
    return (
      <div>
        <h4 id="my-gardens-title">My Gardens</h4>
        <div id="my-gardens">
          {this.props.gardens.map((garden, index) => (
            <GardenBox key={index} garden={garden} index={index} />
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    gardens: state.gardenReducer.gardens
  }
}

const mapDispatch = dispatch => {
  return {
    getGardens: () => dispatch(fetchGardensFromServer())
  }
}

export default connect(mapState, mapDispatch)(MyGardens)
