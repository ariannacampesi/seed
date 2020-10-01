/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar/navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as NewGarden} from './Garden/new-garden'
export {default as LocationForm} from './Location/location-form'
export {default as PlantList} from './Plant/plant-list'
export {default as PlantsInZone} from './Plant/plants-in-zone'
export {default as SinglePlant} from './Plant/single-plant'
export {default as MyGardens} from './Garden/my-gardens'
export {default as SingleGarden} from './Garden/single-garden'
export {default as SingleGardenView} from './Garden/single-garden-view'
export {default as Grid} from './Garden/grid'
