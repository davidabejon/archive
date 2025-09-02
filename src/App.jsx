import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Entry from './views/Entry'
import Character from './views/Character'
import Staff from './views/Staff'

function App() {

  window.addEventListener('click', event => {
    const spoilers = document.querySelectorAll('.markdown_spoiler')
    spoilers.forEach(spoiler => {
      if (spoiler.contains(event.target)) {
        if (spoiler.classList.contains('spoiler-active')) {
          spoiler.classList.remove('spoiler-active')
        } else {
          spoiler.classList.add('spoiler-active')
        }
      }
    })
  })

  return (
    <Router>
      <Routes>
        <Route path={'/'} element={'/'} />
        <Route path={'/:type/:id/:title?'} element={<Entry />} />
        <Route path={'/character/:id/:name?'} element={<Character />} />
        <Route path={'/staff/:id/:name?'} element={<Staff />} />
        <Route path={'*'} element={'not found'} />
      </Routes>
    </Router>
  )
}

export default App
