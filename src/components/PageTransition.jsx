import { motion } from "framer-motion";

function PageTransition({ children, x = 50 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: x }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -x }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;