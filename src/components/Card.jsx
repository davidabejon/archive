import { Link } from 'react-router-dom'
import '../styles/Card.css'
import { motion } from "framer-motion";
import { useState } from 'react';

function Card({ imageSrc, title, subtitle, link, tag, type, secondImageSrc, secondTitle, secondSubtitle, secondLink }) {

  const [hasFirstImgLoaded, setHasFirstImgLoaded] = useState(false)
  const [hasSecondImgLoaded, setHasSecondImgLoaded] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {
        type === 'double' ?
          <div className="card-double">
            <div className='card-double-container'>
              <Link to={link}>
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasFirstImgLoaded ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  src={imageSrc}
                  alt={title}
                  className="card-double-image"
                  onLoad={() => setHasFirstImgLoaded(true)}
                />
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
                  <Link to={secondLink} className='text-right'>{secondTitle}</Link>
                </div>
                <p className="card-subtitle secondary text-xs text-right">{secondSubtitle}</p>
              </div>
              {secondLink && (
                <Link to={secondLink}>
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hasSecondImgLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    src={secondImageSrc}
                    alt={secondTitle}
                    className="card-double-image"
                    onLoad={() => setHasSecondImgLoaded(true)}
                  />
                </Link>)}
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
      }
    </motion.div>
  )
}

export default Card