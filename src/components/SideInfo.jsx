import '../styles/SideInfo.css';
import Info from './Info';

function SideInfo({ format, episodes, duration, startDate, genres, score, popularity, studios, producers, alternativeTitles }) {
  return (
    <div className="side-film-info mt-5">
      <Info tag="Format" value={format} />
      <Info tag="Episodes" value={episodes} />
      <Info tag="Duration" value={`${duration} mins`} />
      <Info tag="Start Date" value={startDate} />
      <Info tag="Genres" value={genres} />
      <Info tag="Score" value={`${score}%`} />
      <Info tag="Popularity" value={popularity} />
      <Info tag="Studios" value={studios} />
      <Info tag="Producers" value={producers} />
      <Info tag="Alternative titles" value={alternativeTitles} />

    </div>
  );
}

export default SideInfo;