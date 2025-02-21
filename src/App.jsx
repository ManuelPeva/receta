import RecetaCanina from './RecetaCanina'
import { useState, useEffect } from "react";
import Spinner from './Spinner';
import { motion } from "framer-motion";
import './App.css'


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Duración de la carga (2 segundos)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
    {loading ? (
      <motion.div
        key="spinner"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        <Spinner />
      </motion.div>
    ) : (
      <motion.div
        key="form"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      >
        <RecetaCanina />
      </motion.div>
    )}
  </div>
  )
}

export default App
