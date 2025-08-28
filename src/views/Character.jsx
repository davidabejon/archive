import { Link, useNavigate, useParams } from "react-router-dom"
import { getCharacterByID } from "../api/queries"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import '../styles/Character.css'
import { marked } from "marked"
import ReadMoreText from "../components/ReadMoreText"
import Card from "../components/Card"

function Character() {

  let navigate = useNavigate()
  const { id } = useParams()

  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)

  var variables = {
    id
  }

  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: getCharacterByID,
        variables: variables
      })
    }

  useEffect(() => {
    setLoading(true)
    fetch(url, options).then(handleResponse)
      .then(handleData)
      .catch(handleError)
  }, [id])

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json)
    })
  }

  function handleData(data) {
    setLoading(false)
    console.log(data.data.Character)
    setCharacter(data.data.Character)
    document.title = data.data.Character.name.full + " - Archive"
    window.history.replaceState({}, '', `/character/${id}/${data.data.Character.name.full ? data.data.Character.name.full.replace(/ /g, '-') : data.data.Character.name.native ? data.data.Character.name.native.replace(/ /g, '-') : ''}`)
  }

  function handleError(error) {
    setLoading(false)
    alert('Error, check console')
    console.error(error)
    navigate('/404')
  }

  return (
    <>
      {loading ? <Loading /> :
        <>
          <div className="character">
            <img src={character?.image?.large} alt={character?.name} />
            <div className="character-info">
              <div className="character-name">
                <h2 className="h2">{character?.name.full}</h2>
                <p className="secondary">{[character?.name.native, ...character?.name.alternative]?.join(", ")}</p>
              </div>
              <div className="character-details">
                {!Object.values(character?.dateOfBirth).some(value => value === null || value === undefined) && (
                  <p className="text-sm"><strong>Birthday:</strong> {new Date(character?.dateOfBirth.year, character?.dateOfBirth.month - 1, character?.dateOfBirth.day).toISOString().split('T')[0]}</p>
                )}
                {character?.age && (
                  <p className="text-sm"><strong>Age:</strong> {character?.age}</p>
                )}
                {character?.gender && (
                  <p className="text-sm"><strong>Gender:</strong> {character?.gender}</p>
                )}
                <ReadMoreText text={marked.parse(character?.description || "").replace(/\n/g, "<br>")} maxLength={900} />
              </div>
            </div>
          </div>
          {
            character?.media?.edges?.length > 0 && (
              <div className="character-media">
                {character.media.edges.map(edge => (
                  <Link to={`/${edge.node.type.toLowerCase()}/${edge.node.id}`} key={edge.node.id} className="flex flex-col" style={{ maxWidth: '200px' }}>
                    <img src={edge.node.coverImage.large} alt={edge.node.title.english || edge.node.title.romaji || edge.node.title.native} />
                    <p className="mt-1 text-sm secondary font-bold">{edge.node.title.english || edge.node.title.romaji || edge.node.title.native}</p>
                  </Link>
                ))}
              </div>
            )
          }
        </>
      }
    </>
  );
}

export default Character;