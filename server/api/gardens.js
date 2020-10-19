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
    const {quantity} = req.body
    const {coordinates} = req.body

    if (
      foundGarden.plants.find(plant => plant.plantId === plantId) !== undefined
    ) {
      console.log('plant is already there!')
      const existingPlant = foundGarden.plants.find(
        plant => plant.plantId === plantId
      )

      const indexOfExistingPlant = foundGarden.plants.indexOf(existingPlant)

      await foundGarden.update({
        plants: foundGarden.plants.map((obj, index) => {
          if (index === indexOfExistingPlant) {
            return {
              plantId: obj.plantId,
              quantity: obj.quantity + 1,
              coordinates: obj.coordinates,
              name: obj.name
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
