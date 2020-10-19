import axios from 'axios'

//ACTION TYPES
const GET_DISTRIBUTION_ZONES = 'GET_DISTRIBUTION_ZONES'
const GET_DISTRIBUTION_ZONE = 'GET_DISTRIBUTION_ZONE'

//ACTION CREATORS
const getDistributionZones = distributionZones => {
  return {
    type: GET_DISTRIBUTION_ZONES,
    distributionZones
  }
}

const getDistributionZone = distributionZone => {
  return {
    type: GET_DISTRIBUTION_ZONE,
    distributionZone
  }
}

//THUNK
export const fetchDistributionZonesFromServer = () => {
  const path = '/api/distribution-zones'
  return async dispatch => {
    try {
      const {data} = await axios.get(path)
      dispatch(getDistributionZones(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const fetchDistributionZoneFromServer = id => {
  const path = `/api/distribution-zones/by-id/${id}`
  console.log('id in store', id)
  return async dispatch => {
    try {
      const {data} = await axios.get(path)
      console.log('data in store', data)
      dispatch(getDistributionZone(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

//REDUCER
const initialState = {
  isLoading: true,
  distributionZones: [],
  distributionZone: {}
}

export default function distributionZonesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DISTRIBUTION_ZONES:
      return {
        ...state,
        isLoading: false,
        distributionZones: action.distributionZones
      }
    case GET_DISTRIBUTION_ZONE:
      return {
        ...state,
        distributionZone: action.distributionZone
      }
    default:
      return state
  }
}
