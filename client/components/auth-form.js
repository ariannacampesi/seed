import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="login-form">
      <form onSubmit={handleSubmit} name={name}>
        <div className="field">
          <label htmlFor="username">username</label>
          <div>
            <input name="username" type="text" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="email">email</label>
          <div>
            <input name="email" type="text" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="password">password</label>
          <div>
            <input name="password" type="password" />
          </div>
        </div>
        <div>
          <button type="submit" id="login-button">
            {displayName}
          </button>
          <a href="/auth/google" id="with-google">
            {displayName} with Google
          </a>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, username, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
