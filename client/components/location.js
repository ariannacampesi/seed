import React, {Component} from 'react'
import axios from 'axios'
import zones from '../../script/distribution-zones'

class LocationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state)
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Location</label>
          <select name="location" onChange={this.handleChange}>
            <option name={zones[0].name}>{zones[0].name}</option>
            <option name={zones[1].name}>{zones[1].name}</option>
            <option name={zones[2].name}>{zones[2].name}</option>
            <option name={zones[3].name}>{zones[3].name}</option>
            <option name={zones[4].name}>{zones[4].name}</option>
          </select>
        </form>
      </div>
    )
  }
}

export default LocationForm
