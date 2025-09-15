import { FaGithub, FaLinkedin, FaLink } from "react-icons/fa"
import david from '../assets/david.jpg'
import '../styles/About.css'
import Title from "antd/es/typography/Title"
import { useState } from "react";

function About() {

  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < 768;

  const handleResize = () => {
    setWidth(window.innerWidth);
  }
  window.addEventListener('resize', handleResize);

  return (
    <div className={`${isMobile ? 'mt-5' : 'mt-40'} padding-center mb-15`}>
      <Title level={2} className='text-center font-bold'>You really wanna know <span className='about-me-gradient'>about me</span>?!</Title>
      <p className='secondary text-center'>
        Hi! My name is <span className='font-bold'>David Abejón</span>, I'm an informatics engineer and I love web development<br></br>
        I created this project as a way to explore new technologies and to share my love for animation with the world.
      </p>
      <div className='flex justify-evenly mt-4 flex-wrap gap-2'>
        <div className='flex flex-col justify-evenly'>
          <Title level={4} className='font-bold m-0 text-center'>Check out my socials below!</Title>
          <div className='flex justify-around'>
            <a href='https://github.com/davidabejon' title='GitHub' target='_blank'>
              <FaGithub style={{ fontSize: '4em' }} />
            </a>
            <a href='https://www.linkedin.com/in/davidabejonheras/' title='Linkedin' target='_blank'>
              <FaLinkedin style={{ fontSize: '4em' }} />
            </a>
            <a href='https://davidabejon.cv/?language=en' title='Portfolio' target='_blank'>
              <FaLink style={{ fontSize: '4em' }} />
            </a>
          </div>
          <p className='secondary text-center my-5'>Send me an email at <a href='mailto:davidabejonheras@gmail.com'>davidabejonheras@gmail.com</a></p>
        </div>
        <img className='my-photo' src={david} alt='Photo of myself!' width={250} height={250} />
      </div>
    </div>
  )
}

export default About