import React from 'react'
import {Navbar, FooterBorder, Footer} from './components'
import Routes from './routes'
import NewGarden from '../client/components/Garden/NewGarden'
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
