const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/plants', require('./plants'))
router.use('/gardens', require('./gardens'))
router.use('/distribution-zones', require('./distribution-zones'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
