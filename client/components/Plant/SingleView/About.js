import React from 'react'

const About = props => {
  const plant = props.plant.main_species
  const {specifications} = plant
  const {growth} = plant
  let edibleParts = ''
  let bloomMonths = ''

  return (
    <div>
      {plant.duration !== null ? <li>duration: {plant.duration}</li> : <div />}
      {plant.edible_part === null ? (
        <div />
      ) : (
        <li>
          edible part(s):{' '}
          {plant.edible_part.map(
            (part, index) =>
              index < plant.edible_part.length - 1
                ? edibleParts + part + ', '
                : edibleParts + part
          )}
        </li>
      )}
      <div>{edibleParts}</div>
      {specifications.growth_form === null ? (
        <div />
      ) : (
        <li>growth form: {specifications.growth_form.toLowerCase()} </li>
      )}
      {specifications.growth_rate === null ? (
        <div />
      ) : (
        <li>growth rate: {specifications.growth_rate.toLowerCase()}</li>
      )}
      {growth.bloom_months === null ? (
        <div />
      ) : (
        <li>
          bloom months:{' '}
          {growth.bloom_months.map(
            (month, index) =>
              index < growth.bloom_months.length - 1
                ? bloomMonths + month + ', '
                : bloomMonths + month
          )}
          <div>{bloomMonths}</div>
        </li>
      )}
    </div>
  )
}

export default About
