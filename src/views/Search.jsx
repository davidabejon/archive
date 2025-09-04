import { motion } from "framer-motion"
import bgImage from '../assets/bright-pop-landscape.jpg'

function Search() {
  return (
    <motion.div className="search-banner" layoutId="search-banner" transition={{ duration: 0.5 }}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${bgImage})` }}
        transition={{ delay: 0.25, duration: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.input
        layoutId="search-bar"
        transition={{ duration: 0.5 }}
        autoFocus
        className="search-input"
        type="text"
        placeholder="Search..."
      />
    </motion.div>
  );
}

export default Search;