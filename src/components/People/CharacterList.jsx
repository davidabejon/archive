import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getStaffCharacters } from "../../api/queries"
import { Button } from "antd"
import { motion } from "framer-motion";

function CharacterList({ setIsPageFinal }) {
  let navigate = useNavigate()
  const { id } = useParams()

  const [characters, setCharacters] = useState(null)
  const [characterPage, setCharacterPage] = useState(1)
  const [sort, setSort] = useState("START_DATE_DESC")
  const [loading, setLoading] = useState(true)

  const variables = {
    id,
    characterPage,
    sort,
    withCharacterRoles: true,
    onList: null,
  }

  const url = "https://graphql.anilist.co"
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: getStaffCharacters,
      variables: variables,
    }),
  }

  useEffect(() => {
    setLoading(true)
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError)
  }, [id, characterPage, sort])

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json)
    })
  }

  function handleData(data) {
    setLoading(false)
    setCharacters((prevState) => {
      return {
        edges: [
          ...(prevState?.edges || []),
          ...data.data.Staff.characterMedia.edges,
        ],
        pageInfo: data.data.Staff.characterMedia.pageInfo,
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
    if (characters.pageInfo.hasNextPage) {
      setCharacterPage(characterPage + 1)
    }
  }

  const groupedByYear = characters?.edges.reduce((acc, edge) => {
    const year = edge.node.startDate?.year || "Not Yet Released"
    if (!acc[year]) acc[year] = []
    acc[year].push(edge)
    return acc
  }, {})

  const sortedYears = groupedByYear
    ? Object.keys(groupedByYear).sort((a, b) => {
      if (a === "Not Yet Released") return -1
      if (b === "Not Yet Released") return 1
      return b - a
    })
    : []

  useEffect(() => {
    setIsPageFinal(!characters?.pageInfo.hasNextPage)
  }, [characters])

  return (
    <div className="mb-10 mt-10">
      {sortedYears.map((year) => (
        <div key={year} className="mb-4">
          <h2 className="text-xl font-bold text-gray-500 padding-center">{year}</h2>
          <div className="character-media flex flex-wrap gap-4">
            {groupedByYear[year].map((edge) => (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  to={`/character/${edge.characters[0].id}`}
                  key={edge.node.id + "-" + edge.characters[0].id}
                  className="flex flex-col"
                  style={{ maxWidth: "200px" }}
                >
                  <img
                    src={edge.characters[0].image.large}
                    alt={edge.characters[0].name.userPreferred}
                  />
                  <p className="mt-1 secondary font-bold lines-two">
                    {edge.characters[0].name.userPreferred}
                  </p>
                  <p className="text-sm secondary lines-two">
                    {edge.node.title.userPreferred}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      <div className="padding-center">
        {characters?.pageInfo.hasNextPage && (
          <Button type="primary" onClick={loadMore} loading={loading}>
            Load More
          </Button>
        )}
      </div>
    </div>
  )
}

export default CharacterList
