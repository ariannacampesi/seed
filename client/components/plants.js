import React, {Component, Fragment} from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

const PLANTS_QUERY = gql`
  query PlantsQuery {
    getPlants {
      common_name
      id
    }
  }
`

export class Plants extends Component {
  render() {
    return (
      <Fragment>
        <Query query={PLANTS_QUERY}>
          {({loading, error, data}) => {
            console.log('data', data)

            if (loading) return <h4>Loading...</h4>
            if (error) console.log('ERROR', error)

            return (
              <Fragment>
                <h2>All Plants</h2>
                ---
                {data.getPlants.map(plant => (
                  <div key={plant.id}>{plant.common_name}</div>
                ))}
              </Fragment>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}

export default Plants
