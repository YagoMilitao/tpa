import { motion } from 'framer-motion';
import { Edit3, MoreHorizontal } from 'lucide-react';

export const HeaderButtons = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-4 right-4 z-20 flex justify-between items-center"
    >
      {/* Botão Edit Circles */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
          flex items-center gap-2 
          px-4 py-2 
          bg-gray-900 
          text-white 
          rounded-full 
          shadow-lg
          hover:bg-gray-800
          transition-colors
        "
      >
        <Edit3 size={16} />
        <span className="text-sm">Edit circles</span>
      </motion.button>

      {/* Botão More Circles */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
          flex items-center gap-2 
          px-4 py-2 
          bg-gray-700 
          text-white 
          rounded-full 
          shadow-lg
          hover:bg-gray-600
          transition-colors
        "
      >
        <MoreHorizontal size={16} />
        <span className="text-sm">More circles</span>
      </motion.button>
    </motion.div>
  );
};