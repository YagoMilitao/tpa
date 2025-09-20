import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderButtons } from './components/HeaderButtons';
import { NewUsersSection } from './components/NewUsersSection';
import { Circle } from './components/Circle';
import { CircleModal } from './components/CircleModal';
import { useCirclesData } from './hooks/useCirclesData';

export default function App() {
  const { circles, newUsers, getCircleById } = useCirclesData();
  
  // Estado para controlar qual círculo está ativo (começamos pelo Circle 3)
  const [activeCircleIndex, setActiveCircleIndex] = useState(2); // Circle 3
  
  // Estado do modal
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null);
  
  // Círculo ativo atual
  const activeCircle = circles[activeCircleIndex];
  
  // Dados do círculo selecionado para o modal
  const selectedCircle = selectedCircleId ? getCircleById(selectedCircleId) : null;

  // Efeito para gerenciar scroll - navega entre os círculos
  useEffect(() => {
    let isScrolling = false;
    
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      isScrolling = true;
      
      // Scroll para cima - vai para círculo anterior (menor número)
      if (e.deltaY < 0 && activeCircleIndex > 0) {
        setActiveCircleIndex(prev => prev - 1);
      }
      // Scroll para baixo - vai para próximo círculo (maior número)
      else if (e.deltaY > 0 && activeCircleIndex < circles.length - 1) {
        setActiveCircleIndex(prev => prev + 1);
      }
      
      // Debounce para evitar scroll muito rápido
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    // Adiciona listener de scroll
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeCircleIndex, circles.length]);

  // Função para abrir modal do círculo
  const handleCircleClick = (circleId: string) => {
    setSelectedCircleId(circleId);
  };

  // Função para fechar modal
  const handleCloseModal = () => {
    setSelectedCircleId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Botões do header */}
      <HeaderButtons />

      {/* Seção de novos usuários */}
      <NewUsersSection users={newUsers} />

      {/* Container principal dos círculos */}
      <div className="relative w-full h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCircle.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="absolute inset-0"
          >
            <Circle
              circle={activeCircle}
              onCircleClick={handleCircleClick}
            />
          </motion.div>
        </AnimatePresence>

        {/* Indicadores de navegação */}
        <div
          className="
            fixed z-20 transform
            bottom-6 left-1/2 -translate-x-1/2
            md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:translate-x-0 md:-translate-y-1/2
          "
        >
          <div className="flex gap-2 flex-row md:flex-col">
            {circles.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveCircleIndex(index)}
                className={`
                  w-3 h-3 rounded-full border-2 border-white transition-all
                  ${index === activeCircleIndex 
                    ? 'bg-yellow-400' 
                    : 'bg-transparent hover:bg-white/30'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Instruções de navegação */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        >
          <p className="text-white/70 text-sm text-center">
            Role para navegar entre os círculos
          </p>
        </motion.div>
      </div>

      {/* Modal para mostrar todos os usuários do círculo */}
      <CircleModal
        isOpen={!!selectedCircleId}
        onClose={handleCloseModal}
        title={selectedCircle?.title || ''}
        users={selectedCircle?.users || []}
      />
    </div>
  );
}