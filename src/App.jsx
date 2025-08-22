import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Entry from './views/Entry';

function App() {

  return (
    <Router>
      <Routes>
        <Route path={'/'} element={'/'} />
        <Route path={'/:type/:id/:title?'} element={<Entry />} />
        <Route path={'*'} element={'not found'} />
      </Routes>
    </Router>
  )
}

export default App
