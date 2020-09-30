import React, {Component} from 'react'
import {fetchDistributionZonesFromServer} from '../../store/location'
import {connect} from 'react-redux'

class NewGarden extends Component {
  constructor() {
    super()
    this.state = {
      currentQuestion: {}
    }
    this.handleClick = this.handleClick.bind(this)
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  componentDidMount() {
    this.props.getDistributionZones()
  }

  handleClick() {
    this.setState(this.nextQuestion())
  }

  nextQuestion() {
    const questions = [
      {
        title: 'Question1',
        return: (
          <div>
            <label>Where is your garden?</label>
            <select>
              {this.props.distributionZones.map((zone, index) => {
                return <option key={index}>{zone.name}</option>
              })}
            </select>
          </div>
        )
      },
      {
        title: 'Question2',
        return: <div>What is the square footage of your garden?</div>
      },
      {
        title: 'Question3',
        return: (
          <div>
            <div>What type of plants do you want to grow?</div>
            <select>
              <option>edible</option>
              <option>non-edible</option>
              <option>both</option>
            </select>
          </div>
        )
      }
    ]
    if (this.state.currentQuestion.title === undefined) {
      return {currentQuestion: questions[0]}
    } else if (this.state.currentQuestion.title === 'Question1') {
      return {currentQuestion: questions[1]}
    } else if (this.state.currentQuestion.title === 'Question2') {
      return {currentQuestion: questions[2]}
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.currentQuestion.return}</div>
        <button type="button" onClick={this.handleClick}>
          Next
        </button>
      </div>
    )
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

export default connect(mapState, mapDispatch)(NewGarden)

//   constructor(props) {
//     super(props)
//     this.state = {isCompleted: false}
//     const {getDistributionZones} = this.props
//     getDistributionZones()
//     this.onCompleteComponent = this.onCompleteComponent.bind(this)
//   }
//   onCompleteComponent() {
//     this.setState({isCompleted: true})
//   }
//   render() {
//     let json = {
//       title: 'Create a Garden',
//       showProgressBar: 'bottom',
//       goNextPageAutomatic: false,
//       showNavigationButtons: true,
//       pages: [
//         {
//           questions: [
//             {
//               type: 'dropdown',
//               name: 'location',
//               title: 'Where is your garden?',
//               choicesOrder: 'alphabetical',
//               choices: this.props.distributionZones.map((zone) => zone.name),
//             },
//           ],
//         },
//         {
//           questions: [
//             {
//               type: 'radiogroup',
//               name: 'plantType',
//               title: 'What kind of plants do you want to grow?',
//               choices: ['edible', 'non-edible', 'both'],
//             },
//           ],
//         },
//         {
//           questions: [
//             {
//               type: 'text',
//               name: 'size',
//               title: 'What is the square footage of your garden?',
//             },
//           ],
//         },
//       ],
//     }

//     const surveyRender = !this.state.isCompleted ? (
//       <Survey.Survey
//         json={json}
//         showCompletedPage={false}
//         onComplete={this.onCompleteComponent}
//       />
//     ) : null
//     const onCompleteComponent = this.state.isCompleted ? (
//       <div>Start designing your garden!</div>
//     ) : null
//     return (
//       <div>
//         {surveyRender}
//         {onCompleteComponent}
//       </div>
//     )
//   }
// }

// const mapState = (state) => {
//   return {
//     distributionZones: state.distributionZonesReducer.distributionZones,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     getDistributionZones: (distributionZones) =>
//       dispatch(fetchDistributionZonesFromServer(distributionZones)),
//   }
// }

// export default connect(mapState, mapDispatch)(NewGarden)
