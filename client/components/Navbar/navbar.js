import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../store'
import {Navbar as NavBar, Nav, NavDropdown} from 'react-bootstrap'
import logo from '../../../public/8052823be0fc380beda00fb8b79c5280.jpg'
import './navbar.css'

const Navbar = ({handleClick, isLoggedIn}) => {
  return (
    <NavBar bg="light" expand="lg" id="nav">
      <NavBar.Brand href="/home">
        <img id="logo" src={logo} />
      </NavBar.Brand>
      <NavBar.Toggle aria-controls="basic-NavBar-nav" />
      <div id="links">
        <Nav.Link href="/plants/in-zone">Browse Plants</Nav.Link>
        {isLoggedIn ? (
          <NavBar.Collapse id="basic-NavBar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/my-gardens">
                  My Gardens
                </NavDropdown.Item>
                <NavDropdown.Item href="/new-garden">
                  Create New Garden
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={handleClick}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </NavBar.Collapse>
        ) : (
          <Nav>
            {/* The navbar will show these links before you log in */}
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        )}
      </div>
    </NavBar>
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
