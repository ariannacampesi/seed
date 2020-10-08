import React from 'react'

const Grid = props => {
  const {size} = props
  // size = 150 square feet

  let inch = 1
  let squareRoot = Math.sqrt(size) //12.24
  let feetInInches = Math.floor(squareRoot * 12) //146.9 inches
  let rows = feetInInches
  let columns = feetInInches

  const tr = []
  for (let r = 0; r < rows; r++) {
    const td = []
    for (let c = 0; c < columns; c++) {
      td.push(<td key={`${r},${c}`} id={`${r},${c}`} />)
    }
    tr.push(<tr key={r}>{td}</tr>)
  }

  return (
    <div id="grid-details">
      <table>
        <tbody id="grid">{tr}</tbody>
      </table>
      <div id="details">
        <div>Total Square Footage: {props.size}</div>
        <div>Remaining Square Footage</div>
      </div>
    </div>
  )
}

export default Grid
