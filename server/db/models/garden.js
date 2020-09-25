const db = require('../db')
const Sequelize = require('sequelize')

const Garden = db.define('garden', {
  plants: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Garden
