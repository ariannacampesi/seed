import React from 'react'

const Grid = props => {
  const {size} = props

  const rows = Math.floor(Math.sqrt(size))
  const columns = Math.floor(Math.sqrt(size))

  const tr = []
  for (let r = 0; r < rows; r++) {
    const td = []
    for (let c = 0; c < columns; c++) {
      td.push(<td key={`${r},${c}`} />)
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
