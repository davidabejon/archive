import '../styles/Navbar.css';
import { Link, useLocation } from "react-router-dom";
import { IoHome, IoSearch } from "react-icons/io5";

function Navbar() {

  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav>
      <ul className='padding-center flex items-center p-4'>
        <li>
          <Link to="/" className='icon-link'>
            <IoHome size={32} color='rgb(197, 197, 197)' />
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
          {location.pathname !== '/' && location.pathname !== '/search' && <Link to="/search" className='icon-link'><IoSearch size={20} color='rgb(197, 197, 197)' /></Link>}
          <Link to="/about" className='nav-link'>About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;