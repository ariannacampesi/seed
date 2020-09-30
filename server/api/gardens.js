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
