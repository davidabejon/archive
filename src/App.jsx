import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Entry from './views/Entry'
import Character from './views/Character'
import Staff from './views/Staff'
import Home from './views/Home'
import { div } from 'motion/react-client'
import { AnimatePresence, LayoutGroup } from 'motion/react'
import Search from './views/Search'
import Navbar from './components/Navbar'

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
    <>
      <Router>
        <Navbar />
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/search'} element={<Search />} />
              <Route path={'/:type/:id/:title?'} element={<Entry />} />
              <Route path={'/character/:id/:name?'} element={<Character />} />
              <Route path={'/staff/:id/:name?'} element={<Staff />} />
              <Route path={'*'} element={'not found'} />
            </Routes>
          </AnimatePresence>
        </LayoutGroup>
      </Router>
    </>
  )
}

export default App
