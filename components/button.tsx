import { useState } from 'react'

function Button() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={handleClick} className='bg-red-400'>
        Clicked {count} times
      </button>
    </div>
  )
}

export default Button
