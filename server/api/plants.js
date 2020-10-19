const router = require('express').Router()
module.exports = router
const axios = require('axios')

router.get('/', async (req, res, next) => {
  try {
    const plants = await axios.get(
      `https://trefle.io/api/v1/plants?token=MgOw1yY9xOKD13YgA-xQmvMyqjPLZLYLmS2NWRaT0hc`
    )
    res.json(plants.data)
  } catch (err) {
    next(err)
  }
})

router.get('/edible', async (req, res, next) => {
  try {
    const plants = await axios.get(
      `https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=MgOw1yY9xOKD13YgA-xQmvMyqjPLZLYLmS2NWRaT0hc`
    )
    res.json(plants.data.data)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.get('/in-zone/:distributionZone/:plantType', async (req, res, next) => {
  try {
    const {distributionZone} = req.params
    const {plantType} = req.params
    let plants
    let pages = [1, 2, 3, 4, 5]
    if (plantType === 'edible') {
      plants = await axios.get(
        `https://trefle.io/api/v1/distributions/${distributionZone}/plants?token=MgOw1yY9xOKD13YgA-xQmvMyqjPLZLYLmS2NWRaT0hc`
      )
    } else {
      plants = await axios.get(
        `https://trefle.io/api/v1/distributions/${distributionZone}/plants?token=MgOw1yY9xOKD13YgA-xQmvMyqjPLZLYLmS2NWRaT0hc`
      )
    }
    let plantLinks = plants.data
    plants = plants.data.data
    // console.log('plants after reassignemnt', plantLinks)
    if (plantLinks.links.next !== 'undefined') {
      let i = 0
      while (plantLinks.links.next !== 'undefined' && i <= 10) {
        let result = await axios.get(
          'https://trefle.io' +
            plantLinks.links.next +
            '&token=MgOw1yY9xOKD13YgA-xQmvMyqjPLZLYLmS2NWRaT0hc'
        )
        await plants.push(...result.data.data)
        if (plantLinks.links.next !== 'undefined') plantLinks = result.data
        i++
      }
    }
    console.log('plants in route', plants)
    res.json(plants)
  } catch (err) {
    next(err)
  }
})

router.get('/:plantId', async (req, res, next) => {
  try {
    const {plantId} = req.params
    const plant = await axios.get(
      `https://trefle.io/api/v1/plants/${plantId}?token=MgOw1yY9xOKD13YgA-xQmvMyqjPLZLYLmS2NWRaT0hc`
    )
    res.json(plant.data.data)
  } catch (err) {
    next(err)
  }
})
