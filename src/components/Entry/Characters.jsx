import { useEffect, useState } from "react"
import { capitalize } from "../../helper"
import Card from "../Card"
import { getCharactersPage } from "../../api/queries"
import { useParams } from "react-router-dom"
import '../../styles/Characters.css'
import { Button } from "antd"
import Spinner from "../Spinner"

function Characters() {

  const { id } = useParams()
  const { type } = useParams()

  const [characters, setCharacters] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCharacters = async () => {
      let allChars = []

      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          query: getCharactersPage,
          variables: { id: id, type: type.toUpperCase(), page, perPage: 25 },
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.errors[0].message)
        setLoading(false)
        return
      }
      const charData = data.data.Media.characters

      allChars = [
        ...characters,
        ...charData.edges.map(edge => ({
          ...edge.node,
          role: edge.role,
          voiceActors: edge.voiceActors,
        })),
      ]

      setHasNextPage(charData.pageInfo.hasNextPage)

      setLoading(false)
      setCharacters(allChars)
    }

    setLoading(true)
    fetchCharacters()
  }, [id, type, page])

  return (
    <>
      {loading && characters.length === 0 && (
        <Spinner />
      )}
      <div className="flex flex-wrap gap-4">
        {characters.map(character => (
          <Card
            key={character.id}
            imageSrc={character.image.medium}
            secondImageSrc={character.voiceActors[0]?.image?.medium}
            title={character.name.full || character.name.native}
            secondTitle={character.voiceActors[0]?.name?.full || character.voiceActors[0]?.name?.native}
            subtitle={capitalize(character.role)}
            secondSubtitle={capitalize(character.voiceActors[0]?.languageV2)}
            link={`/character/${character.id}`}
            secondLink={`/staff/${character.voiceActors[0]?.id}`}
            type={"double"}
          />
        ))}
      </div>
      {hasNextPage && characters.length > 0 && (
        <Button type="primary" className="mt-5" loading={loading} onClick={() => setPage(prevPage => prevPage + 1)} disabled={!hasNextPage}>
          Load More
        </Button>
      )}
    </>
  )
}

export default Characters
