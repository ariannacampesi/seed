import React, {Component} from 'react'
import {
  fetchDistributionZonesFromServer,
  fetchDistributionZoneFromServer
} from '../../store/location'
import {createGardenOnServer} from '../../store/garden'
import {connect} from 'react-redux'
import Grid from './SingleView/Grid'
import {Redirect} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'

class NewGarden extends Component {
  constructor() {
    super()
    this.state = {
      currentQuestion: {
        title: 'Get Started'
      },
      distributionZoneId: '1',
      size: 4,
      plantType: 'edible',
      name: '',
      submitted: false,
      addPlants: false
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.nextQuestion = this.nextQuestion.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getDistributionZones()
  }

  handleChange(event) {
    console.log('change', this.state)
    this.setState({[event.target.name]: event.target.value})
  }

  handleNext() {
    this.setState(this.nextQuestion())
  }

  handlePrev() {
    this.setState(this.prevQuestion())
  }

  async handleSubmit(event) {
    event.preventDefault()
    const size = +this.state.size
    const plantType = this.state.plantType
    const distributionZoneId = +this.state.distributionZoneId
    const name = this.state.name
    await this.props.createGarden({distributionZoneId, name, size, plantType})
    const location = await this.props.getDistributionZone(distributionZoneId)
    console.log('location', location)
    this.setState({submitted: true})
  }

  handleClick() {
    this.setState({addPlants: true})
  }

  nextQuestion() {
    const questions = [
      {
        title: 'Question1',
        return: (
          <div id="Question1">
            <label>Where do you want to grow your garden?</label>
            <select
              className="location-select"
              name="distributionZoneId"
              onChange={this.handleChange}
            >
              {this.props.distributionZones.map((zone, index) => {
                return (
                  <option key={index} value={zone.id}>
                    {zone.name}
                  </option>
                )
              })}
            </select>
          </div>
        ),
        buttonTextNext: '>',
        buttonTextPrev: '<'
      },
      {
        title: 'Question2',
        return: (
          <div id="Question2">
            <label>What is the square footage of your garden?</label>
            <div>
              <input
                id="size-input"
                name="size"
                onChange={this.handleChange}
                type="number"
                defaultValue={this.state.size}
              />
              {' sq ft'}
            </div>
          </div>
        ),
        buttonTextNext: '>',
        buttonTextPrev: '<'
      },
      {
        title: 'Question3',
        return: (
          <div id="Question3">
            <div>Do you want to eat what you grow?</div>
            <select
              id="plant-select"
              name="plantType"
              onChange={this.handleChange}
            >
              <option value="edible">yes</option>
              <option value="non-edible">no</option>
              <option value="both">no preference</option>
            </select>
          </div>
        ),
        buttonTextNext: '>',
        buttonTextPrev: '<'
      },
      {
        title: 'Question4',
        return: (
          <div id="Question4">
            <div>Name of Garden</div>
            <div>
              <input
                id="name-input"
                name="name"
                onChange={this.handleChange}
                type="text"
              />
            </div>
          </div>
        ),
        buttonTextNext: '>',
        buttonTextPrev: '<'
      },
      {
        title: 'Submit',
        return: <div>Create garden!</div>
      }
    ]
    if (this.state.currentQuestion.title === 'Get Started') {
      return {currentQuestion: questions[0]}
    } else if (this.state.currentQuestion.title === 'Question1') {
      return {currentQuestion: questions[1]}
    } else if (this.state.currentQuestion.title === 'Question2') {
      return {currentQuestion: questions[2]}
    } else if (this.state.currentQuestion.title === 'Question3') {
      return {currentQuestion: questions[3]}
    } else if (this.state.currentQuestion.title === 'Question4') {
      return {currentQuestion: questions[4]}
    }
  }

  prevQuestion() {
    const questions = [
      {
        title: 'Question1',
        return: (
          <div id="Question1">
            <label>Where do you want to grow your garden?</label>
            <select
              className="location-select"
              name="distributionZoneId"
              onChange={this.handleChange}
            >
              {this.props.distributionZones.map((zone, index) => {
                return (
                  <option key={index} value={zone.id}>
                    {zone.name}
                  </option>
                )
              })}
            </select>
          </div>
        ),
        buttonTextNext: '>',
        buttonTextPrev: '<'
      },
      {
        title: 'Question2',
        return: (
          <div id="Question2">
            <label>What is the square footage of your garden?</label>
            <div>
              <input
                id="size-input"
                name="size"
                onChange={this.handleChange}
                type="number"
                defaultValue={this.state.size}
              />
              {' sq ft'}
            </div>
          </div>
        ),
        buttonTextNext: '>',
        buttonTextPrev: '<'
      },
      {
        title: 'Question3',
        return: (
          <div id="Question3">
            <div>Do you want to eat what you grow?</div>
            <select
              id="plant-select"
              name="plantType"
              onChange={this.handleChange}
            >
              <option value="edible">yes</option>
              <option value="non-edible">no</option>
              <option value="both">no preference</option>
            </select>
          </div>
        ),
        buttonTextNext: '>',
        buttonTextPrev: '<'
      },
      {
        title: 'Question4',
        return: (
          <div id="Question4">
            <div>Name of Garden</div>
            <div>
              <input
                id="name-input"
                name="name"
                onChange={this.handleChange}
                type="text"
                value={this.state.name}
              />
            </div>
          </div>
        ),
        buttonTextNext: '>',
        buttonTextPrev: '<'
      },
      {
        title: 'Submit',
        return: <div>Create garden!</div>
      }
    ]
    if (this.state.currentQuestion.title === 'Question2') {
      return {currentQuestion: questions[0]}
    } else if (this.state.currentQuestion.title === 'Question3') {
      return {currentQuestion: questions[1]}
    } else if (this.state.currentQuestion.title === 'Question4') {
      return {currentQuestion: questions[2]}
    } else {
      return {currentQuestion: questions[3]}
    }
  }

  render() {
    console.log('in render', this.props)
    if (this.state.submitted === true && this.state.addPlants === false) {
      return (
        <CSSTransition
          in={true}
          timeout={{appear: 0, enter: 0, exit: 300}}
          classNames="roll"
          appear
        >
          <div>
            <div id="garden-created-and-button">
              <h1 id="garden-created">
                {this.props.garden.name} in {this.props.distributionZone.name}{' '}
                created!
              </h1>
              <button
                type="button"
                className="add-plants-button"
                onClick={this.handleClick}
              >
                Add Plants
              </button>
            </div>
            {/* <Grid size={this.state.size} /> */}
          </div>
        </CSSTransition>
      )
    } else if (this.state.submitted === true && this.state.addPlants === true) {
      return (
        <Redirect
          to={{
            pathname: `/plants/in-zone/${this.props.distributionZone.twdgCode}`,
            state: {
              gardenId: this.props.garden.id,
              chooseDifferentLocation: false
            }
          }}
        />
      )
    }

    const {currentQuestion} = this.state
    if (currentQuestion.title === 'Get Started') {
      return (
        <CSSTransition
          in={true}
          timeout={{appear: 0, enter: 0, exit: 300}}
          classNames="roll"
          appear
        >
          <div id="get-started-container">
            <button
              id="get-started-button"
              type="button"
              onClick={this.handleNext}
            >
              {currentQuestion.title}
            </button>
          </div>
        </CSSTransition>
      )
    } else {
      return (
        <CSSTransition
          in={true}
          timeout={{appear: 0, enter: 0, exit: 300}}
          classNames="roll"
          appear
        >
          <form onSubmit={this.handleSubmit}>
            {currentQuestion.title !== 'Submit' ? (
              <div id="questionaire">
                <div>{currentQuestion.return}</div>
                <div className="next-previous">
                  <button
                    type="button"
                    name={currentQuestion.title}
                    onClick={this.handleNext}
                  >
                    {currentQuestion.buttonTextNext}
                  </button>
                </div>
                {currentQuestion.title !== 'Question1' ? (
                  <div className="next-previous">
                    <button
                      type="button"
                      name={currentQuestion.title}
                      onClick={this.handlePrev}
                    >
                      {currentQuestion.buttonTextPrev}
                    </button>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <div id="submit-answers">
                <div>
                  <button type="submit">finish</button>
                </div>
                <div>
                  <button type="button" onClick={this.handlePrev}>
                    go back
                  </button>
                </div>
              </div>
            )}
          </form>
        </CSSTransition>
      )
    }
  }
}

const mapState = state => {
  return {
    distributionZones: state.distributionZonesReducer.distributionZones,
    distributionZone: state.distributionZonesReducer.distributionZone,
    garden: state.gardenReducer.garden
  }
}

const mapDispatch = dispatch => {
  return {
    getDistributionZones: distributionZones =>
      dispatch(fetchDistributionZonesFromServer(distributionZones)),
    getDistributionZone: distributionZoneId =>
      dispatch(fetchDistributionZoneFromServer(distributionZoneId)),
    createGarden: garden => dispatch(createGardenOnServer(garden))
  }
}

export default connect(mapState, mapDispatch)(NewGarden)
