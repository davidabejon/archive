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
import NotFound from './views/NotFound'
import Footer from './components/Footer'
import RouteChangeHandler from './components/RouterChangeHandler'
import About from './views/About'
import TrendingAndNew from './views/TrendingAndNew'
import { getNewAnimeOnly, getNewMangaOnly, getTrendingAnimeOnly, getTrendingMangaOnly } from './api/queries'

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
        <RouteChangeHandler onChange={() => {
          window.scrollTo(0, 0)
        }} />
        <Navbar />
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/search'} element={<Search />} />
              <Route path={'/:type/:id/:title?'} element={<Entry />} />
              <Route path={'/character/:id/:name?'} element={<Character />} />
              <Route path={'/staff/:id/:name?'} element={<Staff />} />
              <Route path={'/anime'} element={<TrendingAndNew key={'anime'} trendingQuery={getTrendingAnimeOnly} newQuery={getNewAnimeOnly} title="Anime" />} />
              <Route path={'/manga'} element={<TrendingAndNew key={'manga'} trendingQuery={getTrendingMangaOnly} newQuery={getNewMangaOnly} title="Manga" />} />
              <Route path={'/about'} element={<About />} />
              <Route path={'*'} element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </LayoutGroup>
        <Footer />
      </Router>
    </>
  )
}

export default App
