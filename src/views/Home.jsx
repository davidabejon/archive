import { Link, useNavigate } from "react-router-dom"
import { getTrending } from "../api/queries"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { statusColors, statuses } from "../constants"
import ImageSkeleton from "../components/ImageSkeleton"
import { Skeleton } from "antd"
import PageTransition from "../components/PageTransition"
import "../styles/Home.css"
import { FaAnglesDown } from "react-icons/fa6";
import bgImage from '../assets/bright-pop-landscape.jpg'

function Home() {

  let navigate = useNavigate()

  const [loadingTrending, setLoadingTrending] = useState(true)
  const [newAnime, setNewAnime] = useState([])
  const [newManga, setNewManga] = useState([])
  const [trending, setTrending] = useState([])

  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: getTrending,
        variables: {}
      })
    }

  useEffect(() => {
    setLoadingTrending(true)
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
    setLoadingTrending(false)
    setNewAnime(data.data.NewAnime.media)
    setNewManga(data.data.NewManga.media)
    setTrending(data.data.Trending.media)
  }

  function handleError(error) {
    setLoadingTrending(false)
    alert('Error, check console')
    console.error(error)
    navigate('/404')
  }

  return (
    <PageTransition x={0}>
      <div className="mb-5">
        <motion.div className="home-search-banner" layoutId="search-banner" transition={{ duration: 0.5 }}>
          <motion.div
            className="absolute inset-0 bg-cover bg-center -z-10"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <motion.input
            layoutId="search-bar"
            transition={{ duration: 0.5 }}
            className="home-search-input"
            type="text" placeholder="Search..."
            onFocus={() => navigate("/search")}
          />
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="home-search-title font-bold text-white flex gap-3 justify-center items-center"
          >
            Explore new Anime & Manga <FaAnglesDown />
          </motion.h1>
        </motion.div>

        <div className="padding-center">
          {trending?.length > 0 ? <h2 className="text-xl font-bold text-gray-500 mt-5">Trending</h2>
            : <Skeleton active paragraph={{ rows: 0 }} className="mt-5 w-2" />}
          <div className="image-grid p-5 rounded-md bg-white">
            {loadingTrending && Array.from({ length: 5 }).map((_, index) => <ImageSkeleton key={index} />)}
            {trending?.map((item) => (
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
          {trending?.length > 0 ? <h2 className="text-xl font-bold text-gray-500 mt-5">Newly Added Anime</h2>
            : <Skeleton active paragraph={{ rows: 0 }} className="mt-5 w-2" />}
          <div className="image-grid p-5 rounded-md bg-white">
            {loadingTrending && Array.from({ length: 5 }).map((_, index) => <ImageSkeleton key={index} />)}
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
          {trending?.length > 0 ? <h2 className="text-xl font-bold text-gray-500 mt-5">Newly Added Manga</h2>
            : <Skeleton active paragraph={{ rows: 0 }} className="mt-5 w-2" />}
          <div className="image-grid p-5 rounded-md bg-white">
            {loadingTrending && Array.from({ length: 5 }).map((_, index) => <ImageSkeleton key={index} />)}
            {newManga?.map((item) => (
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
      </div>
    </PageTransition>
  );
}

export default Home;