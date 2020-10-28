import React, {useState} from 'react'
import ReactCardFlip from 'react-card-flip'

const Card2 = () => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = event => {
    event.preventDefault()
    setIsFlipped(!isFlipped)
  }
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div className="home-cards" onClick={handleClick}>
        Why should I use this method?
      </div>
      <div className="home-cards" onClick={handleClick}>
        It is believed to require less soil and water, as well as produce a
        higher yield at a faster rate.
      </div>
    </ReactCardFlip>
  )
}

export default Card2
