import React from 'react'
import {Navbar, Plants, LocationForm} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Plants /> */}
      <LocationForm />
      <Routes />
    </div>
  )
}

export default App
