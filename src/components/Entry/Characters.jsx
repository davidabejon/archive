import { useEffect, useState } from "react"
import { capitalize } from "../../helper"
import Card from "../Card"
import { getCharactersPage } from "../../api/queries"
import { useParams } from "react-router-dom"

function Characters() {

  const { id } = useParams()
  const { type } = useParams()

  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllCharacters = async () => {
      let allChars = []
      let page = 1
      let hasNextPage = true

      while (hasNextPage) {
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
        const charData = data.data.Media.characters

        allChars = [
          ...allChars,
          ...charData.edges.map(edge => ({
            ...edge.node,
            role: edge.role,
            voiceActors: edge.voiceActors,
          })),
        ]

        hasNextPage = charData.pageInfo.hasNextPage
        page++
      }

      setLoading(false)
      setCharacters(allChars)
    }

    setLoading(true)
    fetchAllCharacters()
  }, [id, type])

  return (
    <>
      {loading ? <p>Loading...</p> : (
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
              type={"double"}
            />
          ))}
        </div>
      )}
    </>
  )
}

      export default Characters
