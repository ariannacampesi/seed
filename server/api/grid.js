const router = require('express').Router()
const {Grid} = require('../db/models')
module.exports = router

router.put('/:coordinates', async (req, res, next) => {
  try {
    console.log('req.body in grid route', req.body)
  } catch (err) {
    next(err)
  }
})
