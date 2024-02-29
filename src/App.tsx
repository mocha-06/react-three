import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Landing from './pages/LandingPage/LandingPage'
import Scroll from './pages/Scroll/Scroll'
import Cube from './pages/Cube/Cube'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Cube" element={<Cube />} />
        <Route path="/Scroll" element={<Scroll />} />
      </Routes>
    </>
  )
}

export default App
