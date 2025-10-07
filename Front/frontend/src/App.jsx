import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Hub from './pages/hub.jsx'
import PageSante from './pages/pageSante.tsx'
import PageArtsCreatifs from './pages/pagesArtsCreatifs.jsx'
import PageCommerceIndustrie from './pages/pageCommerceIndustrie.jsx'
import PageTourisme from './pages/PageTourisme.jsx'
import PageEnvironnement from './pages/pageEnvironnement.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/sante" element={<PageSante />} />
        <Route path="/arts-creatifs" element={<PageArtsCreatifs />} />
        <Route path="/commerce-industrie" element={<PageCommerceIndustrie />} />
        <Route path="/tourisme" element={<PageTourisme />} />
        <Route path="/environnement" element={<PageEnvironnement />} />
      </Routes>
    </Router>
  )
}

export default App