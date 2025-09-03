import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getStaffRoles } from "../../api/queries"
import { Button } from "antd"
import { motion } from "framer-motion";

function StaffRolesList({ enabled = false }) {

  let navigate = useNavigate()
  const { id } = useParams()

  const [animeRoles, setAnimeRoles] = useState(null)
  const [mangaRoles, setMangaRoles] = useState(null)
  const [staffPage, setStaffPage] = useState(1)
  const [sort, setSort] = useState("START_DATE_DESC")
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState("ANIME")

  const variables = {
    id,
    staffPage,
    sort,
    withStaffRoles: true,
    onList: null,
    type
  }

  const url = "https://graphql.anilist.co"
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: getStaffRoles,
      variables: variables,
    }),
  }

  useEffect(() => {
    if (!enabled) return
    setLoading(true)
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError)
  }, [id, staffPage, sort, enabled])

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json)
    })
  }

  function handleData(data) {
    setLoading(false)
    let setFunction = type === 'ANIME' ? setAnimeRoles : setMangaRoles
    setFunction((prevState) => {
      return {
        edges: [
          ...(prevState?.edges || []),
          ...data.data.Staff.staffMedia.edges,
        ],
        pageInfo: data.data.Staff.staffMedia.pageInfo,
      }
    })
  }

  function handleError(error) {
    setLoading(false)
    alert("Error, check console")
    console.error(error)
    navigate("/404")
  }

  const loadMore = () => {
    setStaffPage(staffPage + 1)
  }

  useEffect(() => {
    if (animeRoles && animeRoles?.pageInfo && !animeRoles?.pageInfo?.hasNextPage) {
      setType('MANGA')
      setStaffPage(1)
    }
  }, [animeRoles])

  if (enabled && animeRoles?.edges.length > 0 && !mangaRoles?.edges.length > 0)
    return (
      <div className="mt-10 mb-10">
        {animeRoles?.edges.length > 0 && <h2 className="text-xl font-bold text-gray-500 mb-4 padding-center">Anime Staff Roles</h2>}
        <div className="character-media">
          {animeRoles?.edges.map((edge) => (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link
                to={`/anime/${edge.node.id}`}
                className="flex flex-col"
                style={{ maxWidth: "200px" }}
              >
                <img
                  src={edge.node.coverImage.large}
                  alt={edge.node.title.userPreferred}
                />
                <p className="mt-1 secondary font-bold lines-two">
                  {edge.node.title.userPreferred}
                </p>
                <p className="text-sm secondary">
                  {edge.staffRole}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
        {mangaRoles?.edges.length > 0 && <h2 className="text-xl font-bold text-gray-500 mb-4 mt-10 padding-center">Manga Staff Roles</h2>}
        <div className="character-media">
          {mangaRoles?.edges.map((edge) => (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link
                to={`/manga/${edge.node.id}`}
                className="flex flex-col"
                style={{ maxWidth: "200px" }}
              >
                <img
                  src={edge.node.coverImage.large}
                  alt={edge.node.title.userPreferred}
                />
                <p className="mt-1 secondary font-bold lines-two">
                  {edge.node.title.userPreferred}
                </p>
                <p className="text-sm secondary">
                  {edge.staffRole}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="padding-center mt-5">
          {type === 'ANIME' ? animeRoles?.pageInfo.hasNextPage && (
            <Button type="primary" onClick={loadMore} loading={loading}>
              Load More
            </Button>
          ) : mangaRoles?.pageInfo.hasNextPage && (
            <Button type="primary" onClick={loadMore} loading={loading}>
              Load More
            </Button>
          )}
        </div>
      </div>
    );
  else null
}

export default StaffRolesList;