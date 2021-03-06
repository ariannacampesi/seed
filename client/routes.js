import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Home,
  Login,
  Signup,
  UserHome,
  NewGarden,
  LocationForm,
  PlantsInZone,
  PlantList,
  SinglePlant,
  MyGardens,
  GardenBox,
  SingleGardenView,
  Grid
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/new-garden" component={NewGarden} />
        <Route exact path="/plants/in-zone" component={LocationForm} />
        <Route
          exact
          path="/plants/in-zone/:locationId"
          component={PlantsInZone}
        />
        <Route path="/plants/:plantId/:locationId" component={SinglePlant} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here arte only available after logging in */}
            <Route
              exact
              path="/my-gardens/:gardenId"
              component={SingleGardenView}
            />
            <Route exact path="/my-gardens" component={MyGardens} />
            <Route path="/home" component={Home} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
