import '../styles/Navbar.css';
import { Link, useLocation } from "react-router-dom";
import { IoSearch, IoOptions, IoHome, IoInformationCircleSharp } from "react-icons/io5";
import { FloatButton } from 'antd';
import { useEffect, useState } from 'react';

function Navbar() {

  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < 768;

  const handleResize = () => {
    setWidth(window.innerWidth);
  }
  window.addEventListener('resize', handleResize);

  if (isMobile) {
    return (
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<IoOptions />}
      >
        <Link to="/search"><FloatButton icon={<IoSearch />} /></Link>
        <Link to="/about"><FloatButton icon={<IoInformationCircleSharp />} /></Link>
        <Link to="/"><FloatButton icon={<IoHome />} /></Link>
      </FloatButton.Group>
    )
  } else {
    return (
      <nav>
        <ul className='padding-center flex items-center p-4'>
          <li>
            <Link to="/" className='logo text-2xl'>
              Archive
            </Link>
          </li>
          <li className='nav-links flex justify-center w-full'>
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/anime" className='nav-link'>Anime</Link>
            <Link to="/manga" className='nav-link'>Manga</Link>
            <Link to="/search" className='nav-link'>Browse</Link>
          </li>
          <li>
          </li>
          <li className='nav-links nav-links-right gap-1.5 flex justify-center items-center'>
            <Link to="/about" className='nav-link'>About</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar