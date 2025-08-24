import { useParams } from 'react-router-dom'
import '../../styles/SideInfo.css'
import Info from './Info'

function SideInfo({ format, episodes, chapters, volumes, duration, startDate, endDate, genres, score, popularity, studios, producers, romaji, english, native, alternativeTitles, status }) {

  const { type } = useParams()

  return (
    <div className="side-film-info mt-5">
      <Info tag="Format" value={format} />
      <Info tag="Status" value={status} />
      {type === 'anime' &&
        <>
          <Info tag="Episodes" value={episodes} />
          <Info tag="Duration" value={duration} afterValue=" mins" />
        </>
      }
      {type === 'manga' &&
        <>
          <Info tag="Chapters" value={chapters} />
          <Info tag="Volumes" value={volumes} />
        </>
      }
      <Info
        tag="Start Date"
        value={
          startDate && Object.values(startDate).every(v => v != null && v !== "")
            ? new Date(Number(startDate.year), Number(startDate.month) - 1, Number(startDate.day))
              .toISOString()
              .split("T")[0]
            : null
        }
      />
      <Info
        tag="End Date"
        value={
          endDate && Object.values(endDate).every(v => v != null && v !== "")
            ? new Date(Number(endDate.year), Number(endDate.month) - 1, Number(endDate.day))
              .toISOString()
              .split("T")[0]
            : null
        }
      />
      <Info tag="Genres" value={genres} />
      <Info tag="Score" value={score} afterValue="%" />
      <Info tag="Popularity" value={popularity} />
      {type === 'anime' && (
        <>
          <Info tag="Studios" value={studios} />
          <Info tag="Producers" value={producers} />
        </>
      )}
      <Info tag="Romaji" value={romaji} />
      <Info tag="English" value={english} />
      <Info tag="Native" value={native} />
      <Info tag="Alternative titles" value={alternativeTitles} />
    </div>
  )
}

export default SideInfo