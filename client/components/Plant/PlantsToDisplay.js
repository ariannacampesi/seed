const zones = require('../../../script/distribution-zones')

const plantList = [
  {id: 167021, commonName: 'hey'},
  {id: 167021},
  {id: 167021},
  {id: 191787}
]
const list = [1, 1, 1, 2]

// Array.from(new Set(plantList.map((plant) => plant)))

const filtered = plantList.filter(
  (v, i, a) => a.findIndex(t => t.id === v.id && t.id === v.id) === i
)

const filteredZones = zones.filter(
  (v, i, a) => a.findIndex(t => t.name === v.name && t.name === v.name) === i
)

console.log('filteredZones', filteredZones)
