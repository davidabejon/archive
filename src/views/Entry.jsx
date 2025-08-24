import '../styles/Entry.css'
import { useEffect, useState } from 'react'
import { getAnimeByID } from '../api/queries'
import SideInfo from '../components/SideInfo'
import EntryTabs from '../components/Entry/EntryTabs'
import { capitalize } from '../helper'
import { useNavigate, useParams } from 'react-router-dom'
import { formats } from '../constants'
import Loading from '../components/Loading'
import { Modal } from 'antd'

const MAX_DESCRIPTION_LENGTH = 600

function Entry() {

  let navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const { id } = useParams()
  const { type } = useParams()
  const [film, setFilm] = useState(null)
  const [loading, setLoading] = useState(false)

  var variables = {
    id,
    type: type.toUpperCase()
  }

  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: getAnimeByID,
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
    setFilm(data.data.Media)
    console.log(data.data.Media)
    document.title = `${data.data.Media.title.english || data.data.Media.title.romaji || data.data.Media.title.native} · Archive` || 'Archive'
    window.history.replaceState({}, '', `/${type}/${id}/${data.data.Media.title.english ? data.data.Media.title.english.replace(/ /g, '-') : data.data.Media.title.romaji ? data.data.Media.title.romaji.replace(/ /g, '-') : data.data.Media.title.native.replace(/ /g, '-')}`)
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
          {film?.bannerImage ? <div className='banner' style={{ backgroundImage: `url(${film?.bannerImage})` }} /> : <div className='banner-placeholder'></div>}
          <div className='entry-container'>
            <div className='entry-details'>
              <img className='entry-poster' src={film?.coverImage.large} alt={film?.title.english} />
              <div className='entry-info'>
                <h1 className='text-lg'>{film?.title.english || film?.title.romaji || film?.title.native}</h1>
                {
                  film?.description.length > MAX_DESCRIPTION_LENGTH ?
                    <>
                      <p className='secondary text-sm mt-3 w-full' dangerouslySetInnerHTML={{ __html: new DOMParser().parseFromString(film?.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...', 'text/html').body.innerHTML }} />
                      <button className='text-blue-300 font-bold text-sm mt-2 read-more-btn' onClick={showModal}>Read more</button>
                      <Modal
                        title="Description"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                        width={{
                          xs: '90%',
                          sm: '80%',
                          md: '70%',
                          lg: '60%',
                          xl: '50%',
                          xxl: '40%',
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: new DOMParser().parseFromString(film?.description, 'text/html').body.innerHTML }} />
                      </Modal>
                    </>
                    :
                    <p className='secondary text-sm mt-3 w-full' dangerouslySetInnerHTML={{ __html: new DOMParser().parseFromString(film?.description, 'text/html').body.innerHTML }} />
                }
              </div>
            </div>

            <div className='entry-more-info'>
              <SideInfo
                format={formats[film?.format] || capitalize(film?.format)}
                episodes={film?.episodes}
                duration={film?.duration}
                startDate={film ? new Date(film?.startDate.year, film?.startDate.month - 1, film?.startDate.day).toISOString().split('T')[0] : ''}
                genres={film?.genres}
                score={film?.meanScore}
                popularity={film?.popularity}
                studios={film?.studios.edges.filter(studio => studio.isMain).map(studio => studio.node.name)}
                producers={film?.studios.edges.filter(producer => !producer.isMain).map(producer => producer.node.name)}
                alternativeTitles={[film?.title.romaji, film?.title.native, ...film ? film?.synonyms : []]}
              />
              <EntryTabs
                relations={film?.relations.edges.map(relation => ({
                  relationType: relation.relationType,
                  id: relation.node.id,
                  title: relation.node.title,
                  coverImage: relation.node.coverImage,
                  type: relation.node.type,
                  status: relation.node.status,
                  startDate: relation.node.startDate
                }))}
                characters={film?.characters.edges.map(character => ({
                  id: character.node.id,
                  name: character.node.name,
                  image: character.node.image,
                  voiceActors: character.voiceActors,
                  role: character.role
                }))}
                staff={film?.staff.edges.map(member => ({
                  id: member.node.id,
                  name: member.node.name,
                  image: member.node.image,
                  role: member.role
                }))}
                trailer={film?.trailer}
              />
            </div>

          </div>
        </>}
    </>
  )
}

export default Entry