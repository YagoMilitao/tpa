import { motion } from 'framer-motion';
import type { User } from '../types';


interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  delay?: number; // Para animação escalonada
  onClick?: () => void;
}

export const Avatar = ({ 
  user, 
  size = 'md', 
  showStatus = true, 
  delay = 0,
  onClick 
}: AvatarProps) => {
  // Tamanhos dos avatares baseados no prop size
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  // Tamanhos dos indicadores de status
  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.3,
        delay: delay,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="relative cursor-pointer"
      onClick={onClick}
    >
      {/* Avatar circular */}
      <div className={`
        ${sizeClasses[size]}
        rounded-full 
        bg-gray-200 
        overflow-hidden 
        border-2 
        border-white 
        shadow-md
        transition-transform 
        duration-200 
        hover:scale-110
        hover:shadow-lg
      `}>
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Indicador de status online/offline */}
      {showStatus && (
        <div className={`
          absolute 
          bottom-0 
          right-0 
          ${statusSizes[size]}
          rounded-full 
          border-2 
          border-white
          ${user.isOnline ? 'bg-green-500' : 'bg-gray-300'}
          shadow-sm
          z-10
        `} />
      )}
    </motion.div>
  );
};