const router = require('express').Router()
const {Garden} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const gardens = await Garden.findAll({
      where: {
        userId: 2
      }
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
    })
    res.json(gardens)
  } catch (err) {
    next(err)
  }
})

router.get('/my-gardens', async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id
    const gardens = await Garden.findAll({
      where: {
        userId: userId
      }
    })
    res.json(gardens)
  } catch (err) {
    next(err)
  }
})

router.get('/:gardenId', async (req, res, next) => {
  try {
    const {gardenId} = req.params
    const garden = await Garden.findByPk(gardenId)
    res.json(garden)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  console.log('req.body in route', req.body)
  try {
    const userId = req.user.dataValues.id
    const garden = await Garden.create({
      name: req.body.name,
      size: req.body.size,
      plantType: req.body.plantType,
      distributionZoneId: req.body.distributionZoneId,
      userId: userId
    })
    res.send(garden)
  } catch (err) {
    next(err)
  }
})

router.put('/:gardenId', async (req, res, next) => {
  try {
    const {gardenId} = req.params
    const foundGarden = await Garden.findByPk(+gardenId)
    console.log('req.body', req.body)
    const {plantId} = req.body
    const {coordinates} = req.body
    console.log('hey', foundGarden)
    if (
      foundGarden.plants.find(plant => plant.coordinates === coordinates) !==
      undefined
    ) {
      const existingPlant = foundGarden.plants.find(
        plant => plant.coordinates === coordinates
      )

      const indexOfExistingPlant = foundGarden.plants.indexOf(existingPlant)
      console.log('index of existing plant', indexOfExistingPlant)

      console.log(
        'foundgarden[index]',
        foundGarden.plants[indexOfExistingPlant]
      )

      await foundGarden.update({
        plants: foundGarden.plants.map((obj, index) => {
          if (index === indexOfExistingPlant) {
            return {
              plantId: req.body.plantId,
              quantity: 1,
              coordinates: req.body.coordinates,
              name: req.body.name,
              status: req.body.cellStatus
            }
          } else {
            return obj
          }
        })
      })
    } else {
      console.log('in the else statement')
      await foundGarden.update({
        plants: [...foundGarden.plants, req.body]
      })
    }
    res.json(foundGarden)
  } catch (err) {
    next(err)
  }
})

router.delete('/:gardenId', async (req, res, next) => {
  try {
    const foundGarden = await Garden.findByPk(req.params.gardenId)
    if (foundGarden) {
      const deletedGarden = await Garden.destroy({
        where: {
          id: foundGarden.id
        }
      })
      res.status(204)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/plant/:gardenId', async (req, res, next) => {
  console.log('in delete plant from garden route')
  const {gardenId} = req.params
  const foundGarden = await Garden.findByPk(+gardenId)
  console.log('req.body in delete plant', req.body)
  const {coordinates} = req.body
  console.log('coordinates', coordinates)
  console.log('foundGarden', foundGarden.id)
  console.log(
    foundGarden.plants.find(plant => plant.coordinates === coordinates)
  )
  console.log('foundGarden.plants', foundGarden.plants)
  try {
    if (
      foundGarden.plants.find(plant => plant.coordinates === coordinates) !==
      undefined
    ) {
      const existingPlant = foundGarden.plants.find(
        plant => plant.coordinates === coordinates
      )
      console.log('existingPlant', existingPlant)
      const indexOfExistingPlant = foundGarden.plants.indexOf(existingPlant)
      console.log('indexOfExistingPlant', indexOfExistingPlant)
      console.log('foudnGarden.plants before splice', foundGarden.plants)

      const gardenPlants = [...foundGarden.plants]
      gardenPlants.splice(indexOfExistingPlant, 1)
      foundGarden.plants = gardenPlants

      await foundGarden.save()
      console.log('foudnGarden.plants after splice', foundGarden.plants)
      res.status(204)
    } else {
      return 'in the else statement'
    }
  } catch (err) {
    console.log('there has been an error')

    next(err)
  }
})
