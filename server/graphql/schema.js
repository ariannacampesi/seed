const axios = require('axios')
const {makeExecutableSchema} = require('graphql-tools')

const typeDefs = `
type Query {
  getPlant(id: Int): Plant
  getPlants: [Plant]
  getEdiblePlants: [Plant]
  getPlantsInZone(locationCode: String): [Plant]
},
type Plant {
  id: Int
  common_name: String
  scientific_name: String
  image_url: String
}`

const resolvers = {
  Query: {
    getPlant: async (__, {id}) => {
      const response = await axios.get(
        `https://trefle.io/api/v1/plants/${id}?token=MgOw1yY9xOKD13YgA-xQmvMyqjPLZLYLmS2NWRaT0hc`
      )
      return response.data.data
    },
    getPlants: async () => {
      const response = await axios.get(
        `https://trefle.io/api/v1/plants?token=MgOw1yY9xOKD13YgA-xQmvMyqjPLZLYLmS2NWRaT0hc`
      )
      return response.data.data
    },
    getEdiblePlants: async () => {
      const response = await axios.get(
        `https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=MgOw1yY9xOKD13YgA-xQmvMyqjPLZLYLmS2NWRaT0hc`
      )
      return response.data.data
    },
    getPlantsInZone: async (__, {locationCode}) => {
      const response = await axios.get(
        `https://trefle.io/api/v1/distributions/${locationCode}/plants?token=MgOw1yY9xOKD13YgA-xQmvMyqjPLZLYLmS2NWRaT0hc`
      )
      return response.data.data
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
