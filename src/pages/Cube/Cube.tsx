import { useEffect } from 'react'
import './cube.scss'
import { initThree } from './three'

const Cube = () => {
  useEffect(() => {
    initThree()
  }, [])

  return (
    <div id="cube">
      <canvas id="canvas"></canvas>
    </div>
  )
}

export default Cube