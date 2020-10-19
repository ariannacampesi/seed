import axios from 'axios'

//ACTION TYPES
const GET_PLANT = 'GET_PLANT'
const GET_ALL_PLANTS = 'GET_PLANTS'
const GET_PLANTS_IN_GARDEN = 'GET_PLANTS_IN_GARDEN'
const GET_PLANTS_IN_ZONE = 'GET_PLANTS_IN_ZONE'

//ACTION CREATORS
const getPlant = plant => {
  return {
    type: GET_PLANT,
    plant
  }
}
const getAllPlants = plants => {
  return {
    type: GET_ALL_PLANTS,
    plants
  }
}

const getPlantsInGarden = gardenPlants => {
  return {
    type: GET_PLANTS_IN_GARDEN,
    gardenPlants
  }
}

const getPlantsInZone = plants => {
  return {
    type: GET_PLANTS_IN_ZONE,
    plants
  }
}
//THUNK CREATOR
export const fetchAllPlants = () => {
  const path = '/api/plants'
  return async dispatch => {
    try {
      const {data} = await axios.get(path)
      dispatch(getAllPlants(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const fetchPlant = id => {
  const path = `/api/plants/${id}`
  return async dispatch => {
    try {
      const {data} = await axios.get(path)
      dispatch(getPlant(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const fetchPlantsInGarden = plants => {
  console.log('plants in store', Array.isArray(plants))
  const justIds = plants.map(plant => plant.plantId)
  return async dispatch => {
    try {
      console.log('inside fetchPlantsInGarden try')
      const gardenPlants = await Promise.all(
        justIds.map(id => axios.get(`/api/plants/${id}`))
      )
      console.log('gardenPlants in store', gardenPlants)
      dispatch(getPlantsInGarden(gardenPlants))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const fetchPlantsInZone = (zone, preference) => {
  const path = `/api/plants/in-zone/${zone}/${preference}`
  return async dispatch => {
    try {
      let {data} = await axios.get(path)
      data = data.sort((a, b) => {
        if (a.common_name < b.common_name) return -1
        if (a.common_name > b.common_name) return 1
        return 0
      })
      dispatch(getPlantsInZone(data))
    } catch (err) {
      console.error(err)
    }
  }
}
//REDUCER
const initialState = {
  isLoadingPlants: true,
  isLoadingSinglePlant: true,
  plant: {},
  plants: [],
  gardenPlants: []
}

export default function plantsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANT:
      return {
        ...state,
        isLoadingSinglePlant: false,
        plant: action.plant
      }
    case GET_ALL_PLANTS:
      return {
        ...state,
        isLoadingPlants: false,
        plants: action.plants
      }
    case GET_PLANTS_IN_GARDEN:
      return {
        ...state,
        isLoadingPlants: false,
        gardenPlants: action.gardenPlants
      }
    case GET_PLANTS_IN_ZONE:
      return {
        ...state,
        isLoadingPlants: false,
        plants: action.plants
      }
    default:
      return state
  }
}
