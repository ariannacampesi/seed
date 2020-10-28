import React from 'react'

const About = props => {
  const plant =
    props.plant.main_species !== null ? props.plant.main_species : null
  console.log('plant in About', plant)

  let edibleParts = ''
  let bloomMonths = ''

  return plant !== null ? (
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
      {plant.specifications.growth_form === null ? (
        <div />
      ) : (
        <li>growth form: {plant.specifications.growth_form.toLowerCase()} </li>
      )}
      {plant.specifications.growth_rate === null ? (
        <div />
      ) : (
        <li>growth rate: {plant.specifications.growth_rate.toLowerCase()}</li>
      )}
      {plant.growth.bloom_months === null ? (
        <div />
      ) : (
        <li>
          bloom months:{' '}
          {plant.growth.bloom_months.map(
            (month, index) =>
              index < plant.growth.bloom_months.length - 1
                ? bloomMonths + month + ', '
                : bloomMonths + month
          )}
          <div>{bloomMonths}</div>
        </li>
      )}
    </div>
  ) : (
    <div>details not currently available</div>
  )
}

export default About
