import { useEffect, useState } from "react"
import { getTrendingAnimeOnly } from "../api/queries"
import PageTransition from "../components/PageTransition"
import { Skeleton } from "antd"
import ImageSkeleton from "../components/ImageSkeleton"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { statusColors, statuses } from "../constants"
import '../styles/Home.css'

function Anime() {

  let navigate = useNavigate()
  const [trendingAnime, setTrendingAnime] = useState([])
  const [newAnime, setNewAnime] = useState([])
  const [loading, setLoading] = useState(false)

  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < 768;

  const handleResize = () => {
    setWidth(window.innerWidth);
  }
  window.addEventListener('resize', handleResize);

  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: getTrendingAnimeOnly,
        variables: {}
      })
    }

  useEffect(() => {
    setLoading(true)
    fetch(url, options).then(handleResponse)
      .then(handleData)
      .catch(handleError)
  }, [])

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json)
    })
  }

  function handleData(data) {
    setLoading(false)
    console.log(data)
    setTrendingAnime(data.data.Trending.media)
    setNewAnime(data.data.NewAnime.media)
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
          {loading && Array.from({ length: 6 }).map((_, index) => <ImageSkeleton key={index} />)}
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
        </div>

        {newAnime?.length > 0 ? <h2 className="text-xl font-bold text-gray-500 mt-5">Newly Added Anime</h2>
          : <Skeleton active paragraph={{ rows: 0 }} className="mt-5 w-2" />}
        <div className="image-grid p-5 rounded-md bg-white">
          {loading && Array.from({ length: 6 }).map((_, index) => <ImageSkeleton key={index} />)}
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
        </div>
      </div>
    </PageTransition>
  )
}

export default Anime