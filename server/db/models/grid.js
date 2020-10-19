const db = require('../db')
const Sequelize = require('sequelize')

const Grid = db.define('grid', {
  status: {
    type: Sequelize.ENUM('active', 'inactive')
    // allowNull: false,
    // defaultValue: 'inactive',
  },
  coordinates: {
    type: Sequelize.STRING
  },
  plant: {
    type: Sequelize.STRING
  }
})

module.exports = Grid
