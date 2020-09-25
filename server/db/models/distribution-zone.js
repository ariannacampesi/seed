const db = require('../db')
const Sequelize = require('sequelize')

const DistributionZone = db.define('distributionZone', {
  twdgCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = DistributionZone
