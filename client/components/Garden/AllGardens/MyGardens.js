import React, {Component} from 'react'
import GardenBox from './GardenBox'
import {fetchGardensFromServer} from '../../../store/garden'
import {connect} from 'react-redux'
import {CSSTransition} from 'react-transition-group'

class MyGardens extends Component {
  componentDidMount() {
    this.props.getGardens()
  }

  render() {
    let {gardens} = this.props
    gardens = gardens.sort((a, b) => {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })
    return (
      <CSSTransition
        in={true}
        timeout={{appear: 0, enter: 0, exit: 300}}
        classNames="roll"
        appear
      >
        <div>
          <h4 id="my-gardens-title">My Gardens</h4>
          <div id="my-gardens">
            {gardens.map((garden, index) => (
              <GardenBox key={index} garden={garden} index={index} />
            ))}
          </div>
        </div>
      </CSSTransition>
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
