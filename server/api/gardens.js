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
    const {plantId} = req.body
    console.log('foundGarden', foundGarden)
    if (foundGarden.plants.includes(+plantId)) {
      console.log('plant is already there!')
    } else {
      await foundGarden.update({
        plants: [...foundGarden.plants, plantId]
      })
    }
    res.json(foundGarden)
  } catch (err) {
    next(err)
  }
})
