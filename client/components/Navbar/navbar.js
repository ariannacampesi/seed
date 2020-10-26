import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../store'
import logo from '../../../public/8052823be0fc380beda00fb8b79c5280.png'
import {Link} from 'react-router-dom'
import {Link as link, animateScroll as scroll} from 'react-scroll'

const Navbar = ({handleClick, isLoggedIn}) => {
  return (
    <nav id="nav">
      <div id="seed">
        <Link to="/home" id="seed">
          <img id="logo" src={logo} />
        </Link>
      </div>
      {isLoggedIn ? (
        <div id="links" className="links">
          <Link to="/my-gardens" className="nav-link">
            my gardens
          </Link>
          <Link to="/new-garden" className="nav-link">
            create garden
          </Link>
          {/* <Link to="/plants/in-zone" className="nav-link">
            browse plants
          </Link> */}
          <Link to="#" className="nav-link" onClick={handleClick}>
            logout
          </Link>
        </div>
      ) : (
        <div className="links">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">login</Link>
          <Link to="/signup">sign up</Link>
        </div>
      )}
    </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
