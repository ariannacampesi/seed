/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Home} from './home'
export {default as Navbar} from './Navbar/navbar'
export {default as FooterBorder} from './Footer/footer-border'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as NewGarden} from './Garden/NewGarden'
export {default as LocationForm} from './Location/location-form'
export {default as PlantList} from './Plant/PlantList'
export {default as PlantsInZone} from './Plant/PlantsInZone'
export {default as SinglePlant} from './Plant/SingleView/SinglePlant'
export {default as MyGardens} from './Garden/AllGardens/MyGardens'
export {default as GardenBox} from './Garden/AllGardens/GardenBox'
export {default as SingleGardenView} from './Garden/SingleView/View'
export {default as Grid} from './Garden/SingleView/Grid'
export {default as Footer} from './Footer/footer'
