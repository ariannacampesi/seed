import React, {useState} from 'react'
import ReactCardFlip from 'react-card-flip'

const Card1 = () => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = event => {
    event.preventDefault()
    setIsFlipped(!isFlipped)
  }
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div className="home-cards" onClick={handleClick}>
        What is square foot gardening?
      </div>
      <div className="home-cards" onClick={handleClick}>
        a form of gardening where the planting area is divided into a grid of
        equal squares
      </div>
    </ReactCardFlip>
  )
}

export default Card1
