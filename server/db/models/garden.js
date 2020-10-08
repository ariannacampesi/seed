const db = require('../db')
const Sequelize = require('sequelize')

const Garden = db.define('garden', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      customValidator(size) {
        if (size < 150) {
          throw new Error('Space has to be at least 150 square feet.')
        }
      }
    }
  },
  plantType: {
    type: Sequelize.ENUM('edible', 'non-edible', 'both'),
    allowNull: false
  },
  plants: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
})

module.exports = Garden
