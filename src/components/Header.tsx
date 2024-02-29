import './header.scss'

const Header = () => {
  return (
    <header>
      <h1>Three.js-React-TypeScript</h1>
      <nav>
        <ul>
          <li><a href="/">ThreeAnimation</a></li>
          <li><a href="/Scroll">ScrollAnimation</a></li>
          <li><a href="/Cube">CubeCamera</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header