import React from 'react'
import Card1 from './Card1'
import Card2 from './Card2'
import {CSSTransition} from 'react-transition-group'

const Home = () => {
  return (
    <CSSTransition
      in={true}
      timeout={{appear: 0, enter: 0, exit: 300}}
      classNames="roll"
      appear
    >
      <div>
        <div id="home-top">
          <div id="first-div">Plan your square foot garden with Seed!</div>
          <div id="second-div">Log in or sign up to get started.</div>
        </div>
        <div id="home-cards">
          <Card1 />
          <Card2 />
        </div>
      </div>
    </CSSTransition>
  )
}

export default Home
