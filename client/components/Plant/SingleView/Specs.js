import React from 'react'

const Specs = props => {
  const plant = props.plant.main_species
  const {specifications} = plant
  const {growth} = plant
  return (
    <div>
      {specifications.average_height.cm !== null ? (
        <li>average height: {specifications.average_height.cm} cm</li>
      ) : (
        <div />
      )}
      {specifications.maximum_height.cm !== null ? (
        <li>maximum height: {specifications.maximum_height.cm} cm</li>
      ) : (
        <div />
      )}
      {specifications.growth_form === null ? (
        <div />
      ) : (
        <li>
          growth direction: {specifications.shape_and_orientation.toLowerCase()}
        </li>
      )}
      {growth.maximum_precipitation.mm !== null ? (
        <li>max precipitation: {growth.maximum_precipitation.mm} mm</li>
      ) : (
        <div />
      )}
      {growth.minimum_precipitation.mm !== null ? (
        <li>min precipitation: {growth.minimum_precipitation.mm} mm</li>
      ) : (
        <div />
      )}
      {growth.minimum_temperature.deg_f !== null ? (
        <li>min temperature: {growth.minimum_temperature.deg_f} F</li>
      ) : (
        <div />
      )}
    </div>
  )
}

export default Specs
