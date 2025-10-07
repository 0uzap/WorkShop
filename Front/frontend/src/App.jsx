import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Hub from './pages/hub.jsx'
import PageSante from './pages/pageSante.tsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/sante" element={<PageSante />} />
      </Routes>
    </Router>
  )
}

export default App
