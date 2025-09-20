import { motion } from 'framer-motion';
import { Avatar } from './Avatar';
import type { User } from '../types';


interface NewUsersSectionProps {
  users: User[];
}

export const NewUsersSection = ({ users }: NewUsersSectionProps) => {
  const visibleUsers = users.slice(0, 2); // Mostra apenas 2 usuários
  const remainingCount = users.length - 2; // Quantos restam

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-20 left-4 right-4 z-10"
    >
      <div className="flex items-center justify-center gap-4">
        {/* Usuários visíveis com badge NEW */}
        {visibleUsers.map((user, index) => (
          <div key={user.id} className="relative">
            {/* Badge NEW */}
            <div className="
              absolute 
              -top-6 
              left-1/2 
              transform 
              -translate-x-1/2 
              bg-red-500 
              text-yellow-400 
              px-2 
              py-1 
              rounded 
              text-xs 
              font-bold
              shadow-sm
              z-10
            ">
              NEW
            </div>
            
            {/* Avatar do usuário */}
            <Avatar 
              user={user} 
              size="md" 
              delay={index * 0.1}
            />
          </div>
        ))}

        {/* Indicador de usuários restantes */}
        {remainingCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.3,
              delay: 0.3,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="
              w-12 h-12 
              rounded-full 
              bg-gray-600 
              border-2 
              border-white 
              shadow-md
              flex 
              items-center 
              justify-center
            "
          >
            <span className="text-white text-sm font-bold">
              +{remainingCount}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};