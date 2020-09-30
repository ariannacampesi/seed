//ACTION TYPES
const ADD_PLANT = 'ADD_PLANT'

//ACTION CREATORS
const addPlant = (state = {}, action) => {
  let quantity = 0
  if (state[action.plant.id] !== undefined)
    quantity = state[action.plant.id].quantity

  let newState = {}
  for (let key in state) {
    newState[key] = {...state[key]}
  }

  newState[action.plant.id] = {
    quantity: quantity + 1,
    id: action.plant.id,
    name: action.plant.name
  }
  return newState
}

const garden = (state = {}, action) => {
  switch (action.type) {
    case ADD_PLANT:
      return addPlant(state, action)
    default:
      return state
  }
}

export default garden
