import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../store'
import {Navbar as NavBar, Nav, NavDropdown} from 'react-bootstrap'

const Navbar = ({handleClick, isLoggedIn}) => {
  return (
    <NavBar bg="light" expand="lg" id="nav">
      <NavBar.Brand href="/home">grow</NavBar.Brand>
      <NavBar.Toggle aria-controls="basic-NavBar-nav" />
      {isLoggedIn ? (
        <Nav>
          <NavBar.Collapse id="basic-NavBar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/new-garden">
                  Get Started
                </NavDropdown.Item>
                <NavDropdown.Item href="/plants/in-zone">
                  Plants In My Area
                </NavDropdown.Item>
                <NavDropdown.Item href="/my-gardens">
                  My Gardens
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </NavBar.Collapse>
          <Nav.Link href="#" onClick={handleClick}>
            Logout
          </Nav.Link>
        </Nav>
      ) : (
        <Nav>
          {/* The navbar will show these links before you log in */}
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
        </Nav>
      )}
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
