import axios from 'axios'
//ACTION TYPES
const CREATE_GARDEN = 'CREATE_GARDEN'
const GET_GARDENS = 'GET_GARDENS'
const GET_GARDEN = 'GET_GARDEN'
const ADD_PLANT_TO_GARDEN = 'ADD_PLANT_TO_GARDEN'
const DELETE_GARDEN = 'DELETE_GARDEN'
const REMOVE_PLANT_FROM_GARDEN = 'REMOVE_PLANT_FROM_GARDEN'

//ACTION CREATORS
const createGarden = garden => {
  return {
    type: CREATE_GARDEN,
    garden
  }
}

const getGardens = gardens => {
  return {
    type: GET_GARDENS,
    gardens
  }
}

const getGarden = garden => {
  return {
    type: GET_GARDEN,
    garden
  }
}

const addPlantToGarden = plant => {
  return {
    type: ADD_PLANT_TO_GARDEN,
    plant
  }
}

const deleteGarden = garden => {
  return {
    type: DELETE_GARDEN,
    garden
  }
}

const deletePlantFromGarden = plant => {
  return {
    type: REMOVE_PLANT_FROM_GARDEN,
    plant
  }
}

//THUNK
export const createGardenOnServer = garden => {
  console.log('create garden in the store', garden)

  const path = '/api/gardens'
  return async dispatch => {
    try {
      const {data} = await axios.post(path, garden)
      dispatch(createGarden(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const fetchGardensFromServer = () => {
  const path = '/api/gardens/my-gardens'
  return async dispatch => {
    try {
      const {data} = await axios.get(path)
      dispatch(getGardens(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const fetchGardenFromServer = gardenId => {
  const path = `/api/gardens/${gardenId}`
  return async dispatch => {
    try {
      const {data} = await axios.get(path)
      dispatch(getGarden(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addPlantToGardenOnServer = (gardenId, plant) => {
  const path = `/api/gardens/${gardenId}`
  return async dispatch => {
    try {
      console.log('gardenId', gardenId)
      console.log('plant to add in store', plant)
      const {data} = await axios.put(path, plant)
      console.log('data', data)
      dispatch(addPlantToGarden(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const removeGardenFromServer = gardenId => {
  const path = `/api/gardens/${gardenId}`

  return async dispatch => {
    try {
      const {data} = await axios.delete(path)
      dispatch(deleteGarden(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const removePlantFromGardenOnServer = (gardenId, coordinates) => {
  const path = `/api/gardens/plant/${gardenId}`
  return async dispatch => {
    try {
      console.log('gardenId', gardenId)
      console.log('coordinate to delete in store', coordinates)
      const {data} = await axios.delete(path, coordinates)
      console.log('data', data)
      dispatch(deletePlantFromGarden(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

const initialState = {
  gardens: [],
  garden: {},
  gardenPlant: ''
}

const gardenReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GARDEN:
      return {
        ...state,
        garden: action.garden
      }
    case GET_GARDENS:
      return {
        ...state,
        gardens: action.gardens
      }
    case GET_GARDEN:
      return {
        ...state,
        garden: action.garden
      }
    case ADD_PLANT_TO_GARDEN:
      return {
        ...state,
        gardenPlant: action.plant
      }
    case DELETE_GARDEN:
      return {
        ...state,
        garden: action.garden
      }
    default:
      return state
  }
}

export default gardenReducer
