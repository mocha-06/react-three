import { useEffect } from 'react'
import { initThree } from './three'
import { Link } from 'react-router-dom'
import './landingPage.scss'

const Landing = () => {
  useEffect(() => {
    initThree()
  }, [])

  return (
    <div id="Landing">

      <canvas className="webgl"></canvas>

      <main className="section">
        <div className="content">
          <h1>Three.js</h1>
          <p>
            LandingPageを作成してみました
            <br />
            マウスでの操作が可能です
          </p>
          <button><Link to="/Scroll">ScrollAnimationへ</Link></button>
          <button><Link to="/Cube">CubeCameraへ</Link></button>
        </div>
      </main>
    </div>
  )
}

export default Landing
