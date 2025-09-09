import { motion } from "framer-motion"
import bgImage from '../assets/bright-pop-landscape.jpg'
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { searchQuery } from "../api/queries"
import Card from "../components/Card"
import { formats } from "../constants"
import Spinner from "../components/Spinner"

function Search() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)

  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasFetchedData, setHasFetchedData] = useState(false)
  const [anime, setAnime] = useState([])
  const [manga, setManga] = useState([])
  const [characters, setCharacters] = useState([])
  const [staff, setStaff] = useState([])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery })
    } else {
      setSearchParams({})
    }
  }, [debouncedQuery, setSearchParams])

  const variables = {
    page,
    perPage: 8,
    search: debouncedQuery
  }

  const url = 'https://graphql.anilist.co'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: searchQuery,
      variables: variables
    })
  }

  // Fetch cuando cambia debouncedQuery o page
  useEffect(() => {
    if (!debouncedQuery) return
    setLoading(true)
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError)
  }, [debouncedQuery, page])

  function handleResponse(response) {
    return response.json().then(json =>
      response.ok ? json : Promise.reject(json)
    )
  }

  function handleData(data) {
    setLoading(false)
    setAnime(data.data.anime.media)
    setManga(data.data.manga.media)
    setCharacters(data.data.characters.characters)
    setStaff(data.data.staff.staff)
    setHasFetchedData(true)
  }

  function handleError(error) {
    setLoading(false)
    console.error(error)
    navigate('/404')
  }
  
  function handleBlur() {
    if (!query && !hasFetchedData) {
      // navigate('/')
    }
  }

  return (
    <div className="pb-5" style={{ height: hasFetchedData && !loading ? '' : '90vh' }}>
      <motion.div className="search-banner" layoutId="search-banner" transition={{ duration: 0.5 }}>
        <motion.div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${bgImage})` }}
          transition={{ delay: 0.25, duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.input
          layoutId="search-bar"
          transition={{ duration: 0.5 }}
          autoFocus
          onBlur={handleBlur}
          className="search-input"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </motion.div>

      <div className="flex flex-wrap gap-8 padding-center justify-around">
        {loading && <Spinner />}

        {anime.length > 0 && !loading && (
          <div className="flex flex-col">
            <h2 className="h4 mb-4">Anime</h2>
            <div className="flex flex-col gap-4">
              {anime.map((item) => (
                <Card
                  key={item.id}
                  title={item.title.english || item.title.romaji || item.title.native}
                  subtitle={item.startDate.year ? `${item.startDate.year} · ${formats[item.format]}` : formats[item.format]}
                  imageSrc={item.coverImage.large}
                  link={`/${item.type.toLowerCase()}/${item.id}`}
                  type={'default-sm'}
                />
              ))}
            </div>
          </div>
        )}

        {manga.length > 0 && !loading && (
          <div className="flex flex-col">
            <h2 className="h4 mb-4">Manga</h2>
            <div className="flex flex-col gap-4">
              {manga.map((item) => (
                <Card
                  key={item.id}
                  title={item.title.english || item.title.romaji || item.title.native}
                  subtitle={`${item.startDate.year} · ${formats[item.format]}`}
                  imageSrc={item.coverImage.large}
                  link={`/${item.type.toLowerCase()}/${item.id}`}
                  type={'default-sm'}
                />
              ))}
            </div>
          </div>
        )}

        {characters.length > 0 && !loading && (
          <div className="flex flex-col">
            <h2 className="h4 mb-4">Characters</h2>
            <div className="flex flex-col gap-4">
              {characters.map((item) => (
                <Card
                  key={item.id}
                  title={item.name.full || item.name.native}
                  imageSrc={item.image.large}
                  link={`/character/${item.id}`}
                  type={'default-sm'}
                />
              ))}
            </div>
          </div>
        )}

        {staff.length > 0 && !loading && (
          <div className="flex flex-col">
            <h2 className="h4 mb-4">Staff</h2>
            <div className="flex flex-col gap-4">
              {staff.map((item) => (
                <Card
                  key={item.id}
                  title={item.name.full || item.name.native}
                  imageSrc={item.image.large}
                  link={`/staff/${item.id}`}
                  type={'default-sm'}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
