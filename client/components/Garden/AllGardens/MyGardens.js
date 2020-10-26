import React, {Component} from 'react'
import GardenBox from './GardenBox'
import {
  fetchGardensFromServer,
  removeGardenFromServer
} from '../../../store/garden'
import {connect} from 'react-redux'
import {CSSTransition} from 'react-transition-group'

class MyGardens extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleDeleteGarden = this.handleDeleteGarden.bind(this)
  }

  async componentDidMount() {
    await this.props.getGardens()
  }

  handleClick() {
    this.setState({edit: !this.state.edit})
  }

  async handleDeleteGarden(event) {
    // event.preventDefault()
    console.log('event.target.value', event.target.value)
    const gardenId = event.target.value
    this.updateState(gardenId)
    await this.props.deleteGarden(gardenId)
  }

  updateState(gardenId) {
    let index = this.props.gardens.findIndex(garden => garden.id === +gardenId)
    this.props.gardens.splice(index, 1)
    const data = this.props.gardens
    console.log('data', data)
    this.setState({gardens: data})
  }

  render() {
    if (this.props.gardens) {
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
            <h4 id="my-gardens-title">my gardens</h4>
            <div id="edit-gardens-div">
              <button
                id="edit-gardens-button"
                type="button"
                onClick={this.handleClick}
              >
                {this.state.edit === false
                  ? 'edit gardens'
                  : 'finished editing'}
              </button>
            </div>
            <div id="my-gardens">
              {gardens.map((garden, index) => (
                <div key={garden.id} id="garden-container">
                  <GardenBox
                    garden={garden}
                    index={index}
                    edit={this.state.edit}
                  />
                  {this.state.edit === true ? (
                    <button
                      type="submit"
                      onClick={this.handleDeleteGarden}
                      id="delete-garden-button"
                      value={garden.id}
                    >
                      delete
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CSSTransition>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

const mapState = state => {
  return {
    gardens: state.gardenReducer.gardens
  }
}

const mapDispatch = dispatch => {
  return {
    getGardens: () => dispatch(fetchGardensFromServer()),
    deleteGarden: gardenId => dispatch(removeGardenFromServer(gardenId))
  }
}

export default connect(mapState, mapDispatch)(MyGardens)
