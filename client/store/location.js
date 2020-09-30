import axios from 'axios'

//ACTION TYPES
const GET_DISTRIBUTION_ZONES = 'GET_DISTRIBUTION_ZONES'

//ACTION CREATORS
const getDistributionZones = distributionZones => {
  return {
    type: GET_DISTRIBUTION_ZONES,
    distributionZones
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

//REDUCER
const initialState = {
  isLoading: true,
  distributionZones: []
}

export default function distributionZonesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DISTRIBUTION_ZONES:
      return {
        ...state,
        isLoading: false,
        distributionZones: action.distributionZones
      }
    default:
      return state
  }
}
