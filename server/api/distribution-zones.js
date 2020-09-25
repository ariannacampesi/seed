const router = require('express').Router()
const {DistributionZone} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const distributionZones = await DistributionZone.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['name']
    })
    res.json(distributionZones)
  } catch (err) {
    next(err)
  }
})
