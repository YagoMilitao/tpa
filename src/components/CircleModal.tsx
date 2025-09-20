import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Avatar } from './Avatar';
import type { User } from '../types';


interface CircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  users: User[];
}

export const CircleModal = ({ isOpen, onClose, title, users }: CircleModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay de fundo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="
              fixed 
              bottom-0 
              left-0 
              right-0 
              bg-white 
              rounded-t-2xl 
              z-50
              max-h-[80vh]
              overflow-hidden
            "
          >
            {/* Header do modal */}
            <div className="
              flex 
              items-center 
              justify-between 
              p-4 
              border-b 
              border-gray-200
              sticky 
              top-0 
              bg-white
            ">
              <h2 className="text-lg font-semibold text-gray-900">
                {title} - {users.length} usuários
              </h2>
              
              {/* Botão voltar */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="
                  p-2 
                  rounded-full 
                  bg-gray-100 
                  hover:bg-gray-200 
                  transition-colors
                "
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Lista de usuários */}
            <div className="overflow-y-auto max-h-[60vh] p-4">
              <div className="space-y-3">
                {users.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="
                      flex 
                      items-center 
                      gap-3 
                      p-3 
                      rounded-lg 
                      hover:bg-gray-50 
                      transition-colors
                    "
                  >
                    {/* Avatar do usuário */}
                    <Avatar user={user} size="md" showStatus={true} />
                    
                    {/* Nome do usuário */}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};