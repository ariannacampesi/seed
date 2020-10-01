import axios from 'axios'
//ACTION TYPES
const CREATE_GARDEN = 'CREATE_GARDEN'
const GET_GARDENS = 'GET_GARDENS'
const GET_GARDEN = 'GET_GARDEN'

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

//THUNK
export const createGardenOnServer = garden => {
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
const initialState = {
  distributionZoneId: 0,
  size: 0,
  plantType: '',
  plants: [],
  gardens: [],
  garden: {}
}

const gardenReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GARDEN:
      return {
        ...state,
        distributionZoneId: action.distributionZoneId,
        size: action.size,
        plantType: action.plantType
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
    default:
      return state
  }
}

export default gardenReducer
