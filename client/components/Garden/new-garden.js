import React, {Component} from 'react'
import {fetchDistributionZonesFromServer} from '../../store/location'
import {createGardenOnServer} from '../../store/garden'
import {connect} from 'react-redux'
import Grid from './grid'

class NewGarden extends Component {
  constructor() {
    super()
    this.state = {
      currentQuestion: {
        title: 'Get Started'
      },
      distributionZoneId: '1',
      size: 150,
      plantType: 'edible',
      submitted: false
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.nextQuestion = this.nextQuestion.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  handleSubmit(event) {
    event.preventDefault()
    const size = +this.state.size
    const plantType = this.state.plantType
    const distributionZoneId = +this.state.distributionZoneId
    this.props.createGarden({distributionZoneId, size, plantType})
    this.setState({submitted: true})
  }

  nextQuestion() {
    const questions = [
      {
        title: 'Question1',
        return: (
          <div id="Question1">
            <label>Where do you want to grow your garden?</label>
            <select name="distributionZoneId" onChange={this.handleChange}>
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
            <div>What type of plants do you want to grow?</div>
            <select name="plantType" onChange={this.handleChange}>
              <option value="edible">edible</option>
              <option value="non-edible">non-edible</option>
              <option value="both">both</option>
            </select>
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
    }
  }

  prevQuestion() {
    const questions = [
      {
        title: 'Question1',
        return: (
          <div id="Question1">
            <label>Where do you want to grow your garden?</label>
            <select name="distributionZoneId" onChange={this.handleChange}>
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
            <div>What type of plants do you want to grow?</div>
            <select name="plantType" onChange={this.handleChange}>
              <option value="edible">edible</option>
              <option value="non-edible">non-edible</option>
              <option value="both">both</option>
            </select>
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
    } else {
      return {currentQuestion: questions[2]}
    }
  }

  render() {
    if (this.state.submitted === true) {
      return (
        <div>
          <h4>Garden created!</h4>
          <Grid size={this.state.size} />
          <div>Start picking your plants!</div>
        </div>
      )
    }

    const {currentQuestion} = this.state
    if (currentQuestion.title === 'Get Started') {
      return (
        <div id="get-started-container">
          <button
            id="get-started-button"
            type="button"
            onClick={this.handleNext}
          >
            {currentQuestion.title}
          </button>
        </div>
      )
    } else {
      return (
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
                <button type="submit">Finish</button>
              </div>
              <div>
                <button type="button" onClick={this.handlePrev}>
                  Go Back
                </button>
              </div>
            </div>
          )}
        </form>
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
    getDistributionZones: distributionZones =>
      dispatch(fetchDistributionZonesFromServer(distributionZones)),
    createGarden: garden => dispatch(createGardenOnServer(garden))
  }
}

export default connect(mapState, mapDispatch)(NewGarden)
