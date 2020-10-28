import React from 'react'

const Specs = props => {
  const plant = props.plant !== null ? props.plant.main_species : null

  return plant !== null ? (
    <div>
      {plant.specifications.average_height.cm !== null ? (
        <li>average height: {plant.specifications.average_height.cm} cm</li>
      ) : (
        <div />
      )}
      {plant.specifications.maximum_height.cm !== null ? (
        <li>maximum height: {plant.specifications.maximum_height.cm} cm</li>
      ) : (
        <div />
      )}
      {plant.specifications.growth_form === null ? (
        <div />
      ) : (
        <li>
          growth direction:{' '}
          {plant.specifications.shape_and_orientation.toLowerCase()}
        </li>
      )}
      {plant.growth.maximum_precipitation.mm !== null ? (
        <li>max precipitation: {plant.growth.maximum_precipitation.mm} mm</li>
      ) : (
        <div />
      )}
      {plant.growth.minimum_precipitation.mm !== null ? (
        <li>min precipitation: {plant.growth.minimum_precipitation.mm} mm</li>
      ) : (
        <div />
      )}
      {plant.growth.minimum_temperature.deg_f !== null ? (
        <li>min temperature: {plant.growth.minimum_temperature.deg_f} F</li>
      ) : (
        <div />
      )}
    </div>
  ) : (
    <div>specs not currently available</div>
  )
}

export default Specs
