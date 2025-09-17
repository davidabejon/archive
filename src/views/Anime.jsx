import { useEffect, useState } from "react"
import { getNewAnimeOnly, getTrendingAnimeOnly } from "../api/queries"
import PageTransition from "../components/PageTransition"
import { Button, Skeleton } from "antd"
import ImageSkeleton from "../components/ImageSkeleton"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { statusColors, statuses } from "../constants"
import '../styles/Home.css'
import { FaArrowDownLong } from "react-icons/fa6";

function Anime() {

  let navigate = useNavigate()
  const [trendingAnime, setTrendingAnime] = useState([])
  const [newAnime, setNewAnime] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageTrending, setPageTrending] = useState(1)
  const [pageNew, setPageNew] = useState(1)

  const [width, setWidth] = useState(window.innerWidth)
  const isMobile = width < 768

  const handleResize = () => {
    setWidth(window.innerWidth)
  }
  window.addEventListener('resize', handleResize)

  const variablesTrending = {
    page: pageTrending,
    perPage: 12
  }
  const variablesNew = {
    page: pageNew,
    perPage: 12
  }

  var urlTrending = 'https://graphql.anilist.co',
    optionsTrending = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: getTrendingAnimeOnly,
        variables: variablesTrending
      })
    }

  var urlNew = 'https://graphql.anilist.co',
    optionsNew = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: getNewAnimeOnly,
        variables: variablesNew
      })
    }

  useEffect(() => {
    setLoading(true)
    fetch(urlTrending, optionsTrending).then(handleResponse)
      .then(handleDataTrending)
      .catch(handleError)
  }, [pageTrending])

  useEffect(() => {
    setLoading(true)
    fetch(urlNew, optionsNew).then(handleResponse)
      .then(handleDataNew)
      .catch(handleError)
  }, [pageNew])

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json)
    })
  }

  function handleDataTrending(data) {
    setLoading(false)
    console.log(data)
    setTrendingAnime((prev) => [...prev, ...data.data.Trending.media])
  }

  function handleDataNew(data) {
    setLoading(false)
    console.log(data)
    setNewAnime((prev) => [...prev, ...data.data.NewAnime.media])
  }

  function handleError(error) {
    setLoading(false)
    alert('Error, check console')
    console.error(error)
    navigate('/404')
  }

  return (
    <PageTransition x={0}>
      <div className={`padding-center ${isMobile ? 'mt-5' : 'mt-20'}`}>
        {trendingAnime?.length > 0 ? <h2 className="text-xl font-bold text-gray-500 mt-5">Trending Anime</h2>
          : <Skeleton active paragraph={{ rows: 0 }} className="mt-5 w-2" />}
        <div className="image-grid p-5 rounded-md bg-white">
          {trendingAnime?.map((item) => (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link
                to={`/${item.type.toLowerCase()}/${item.id}`}
                className="flex flex-col"
              >
                <img
                  src={item.coverImage.large}
                  alt={item.title.userPreferred}
                />
                <p className="mt-1 secondary font-bold lines-two">
                  {item.title.userPreferred}
                </p>
                <p className="mt-1 secondary text-sm flex items-center">
                  <div className="w-2 h-2 rounded-full inline-block mr-1" style={{ backgroundColor: statusColors[item.status] }}></div>
                  {statuses[item.status]}
                </p>
              </Link>
            </motion.div>
          ))}
          {loading && Array.from({ length: 6 }).map((_, index) => <ImageSkeleton key={index} />)}
        </div>
        <div className="w-full flex justify-end items-center">
          <Button className="mt-2" onClick={() => setPageTrending(pageTrending + 1)} disabled={loading} icon={<FaArrowDownLong />} iconPosition="end">Load More</Button>
        </div>

        {newAnime?.length > 0 ? <h2 className="text-xl font-bold text-gray-500 mt-5">Newly Added Anime</h2>
          : <Skeleton active paragraph={{ rows: 0 }} className="mt-5 w-2" />}
        <div className="image-grid p-5 rounded-md bg-white">
          {newAnime?.map((item) => (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link
                to={`/${item.type.toLowerCase()}/${item.id}`}
                className="flex flex-col"
              >
                <img
                  src={item.coverImage.large}
                  alt={item.title.userPreferred}
                />
                <p className="mt-1 secondary font-bold lines-two">
                  {item.title.userPreferred}
                </p>
                <p className="mt-1 secondary text-sm flex items-center">
                  <div className="w-2 h-2 rounded-full inline-block mr-1" style={{ backgroundColor: statusColors[item.status] }}></div>
                  {statuses[item.status]}
                </p>
              </Link>
            </motion.div>
          ))}
          {loading && Array.from({ length: 6 }).map((_, index) => <ImageSkeleton key={index} />)}
        </div>
        <div className="w-full flex justify-end items-center">
          <Button className="mt-2" onClick={() => setPageNew(pageNew + 1)} disabled={loading} icon={<FaArrowDownLong />} iconPosition="end">Load More</Button>
        </div>

      </div>
    </PageTransition>
  )
}

export default Anime