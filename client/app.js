import React from 'react'
import {Navbar, FooterBorder, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <FooterBorder />
      {/* <Footer /> */}
    </div>
  )
}

export default App
