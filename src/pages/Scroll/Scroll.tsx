import './scroll.scss'
import { useEffect } from 'react'
import { initThree } from './three'

const Scroll = () => {
  useEffect (() => {
    initThree()
  },[])

  return (
    <div id="Scroll">
      <canvas id='webgl'></canvas>
      <span id='scrollProgress'></span>
      <main>
        <h1>PortFolio</h1>
        <section>
          <h2>Three.js</h2>
        </section>
        <section>
          <h2>ScrollAnimation</h2>
          <p>ScrollAnimationを実装してみました</p>
        </section>
        <section>
          <h2>使用スキル</h2>
          <p>React/Threejs/TypeScript</p>
        </section>
        <section>
          <h2>LandingPage</h2>
          <p><a href="/">LandingPageへ</a></p>
        </section>

        <section>
          <h2>CubeCamera</h2>
          <p><a href="/Cube">CubeCameraへ</a></p>
        </section>
      </main>
    </div>
  )
}

export default Scroll
