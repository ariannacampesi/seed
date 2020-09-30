const db = require('../db')
const Sequelize = require('sequelize')

const Garden = db.define('garden', {
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  plantType: {
    type: Sequelize.ENUM('edible', 'non-edible', 'both'),
    allowNull: false
  },
  plants: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Garden
