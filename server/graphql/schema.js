const axios = require('axios')
const {makeExecutableSchema} = require('graphql-tools')

const typeDefs = `
type Query {
  getPerson(id: ID!): Person
  getPeople: [Person]
},
type Person {
  id: Int
  name: String
  height: Int
  mass: Int
}`

const resolvers = {
  Query: {
    getPeople: async () => {
      const response = await axios.get(`https://swapi.dev/api/people`)
      return response.data.results
    },
    getPerson: async (_, {id}) => {
      const response = await axios.get(`https://swapi.dev/api/people/${id}`)
      return response.data
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
