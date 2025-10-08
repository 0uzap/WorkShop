import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Hub from './pages/hub.jsx'
import PageSante from './pages/pageSante.tsx'
import PageArtsCreatifs from './pages/pagesArtsCreatifs.tsx'
import PageCommerceIndustrie from './pages/pageCommerceIndustrie.tsx'
import PageTourisme from './pages/PageTourisme.tsx'
import PageEnvironnement from './pages/pageEnvironnement.tsx'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Lobby from './components/Lobby.jsx'
function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/hub" element={<Hub />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/sante" element={<PageSante />} />
        <Route path="/arts-creatifs" element={<PageArtsCreatifs />} />
        <Route path="/commerce-industrie" element={<PageCommerceIndustrie />} />
        <Route path="/tourisme" element={<PageTourisme />} />
        <Route path="/environnement" element={<PageEnvironnement />} />
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App