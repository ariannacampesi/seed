import React, {useState} from 'react'

const Td = props => {
  const [status, setStatus] = useState('inactive')
  console.log('props in Td', props)
  return (
    <td
      onClick={props.onClick}
      className={status}
      key={props.key}
      id={props.id}
      index={props.index}
    />
  )
}

export default Td
