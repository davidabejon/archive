import { Link } from 'react-router-dom'
import '../styles/Card.css'

function Card({ imageSrc, title, subtitle, link, tag, type, secondImageSrc, secondTitle, secondSubtitle, secondLink }) {
  return (
    type === 'double' ?
      <div className="card-double">
        <div className='card-double-container'>
          <Link to={link}>
            <img src={imageSrc} alt={title} className="card-double-image" />
          </Link>
          <div className="card-content">
            <div className='card-title'>
              {tag && <span className="text-blue-300 font-bold text-xs">{tag}</span>}
              <Link to={link}>{title}</Link>
            </div>
            <p className="card-subtitle secondary text-xs">{subtitle}</p>
          </div>
        </div>
        <div className='card-double-container'>
          <div className="card-content">
            <div className='card-title'>
              {tag && <span className="text-blue-300 font-bold text-xs">{tag}</span>}
              <Link to={link} className='text-right'>{secondTitle}</Link>
            </div>
            <p className="card-subtitle secondary text-xs text-right">{secondSubtitle}</p>
          </div>
          <Link to={secondLink}>
            <img src={secondImageSrc} alt={secondTitle} className="card-double-image" />
          </Link>
        </div>
      </div>
      : type === 'small' ?
        <div className="image-link-container">
          <Link to={link}>
            <div
              style={{ backgroundImage: `url(${imageSrc})` }}
              className="image-link"
            />
          </Link>
          <p className="image-link-description">{tag}</p>
          <div className="info-card">
            <div className='card-title'>
              {tag && <span className="text-blue-300 font-bold text-xs">{tag}</span>}
              <Link to={link}>{title}</Link>
            </div>
            <p className="card-subtitle secondary text-xs">{subtitle}</p>
          </div>
        </div>
        : // default or default-sm
        <div className={`card ${type === 'default-sm' ? 'card-sm' : ''}`}>
          <Link to={link}>
            <div className={`card-image ${type === 'default-sm' ? 'card-image-sm' : ''}`} style={{ backgroundImage: `url(${imageSrc})` }} />
          </Link>
          <div className="card-content">
            <div className='card-title'>
              {tag && <span className="text-blue-300 font-bold text-xs">{tag}</span>}
              <Link to={link}>{title}</Link>
            </div>
            <p className="card-subtitle secondary text-xs">{subtitle}</p>
          </div>
        </div>
  )
}

export default Card