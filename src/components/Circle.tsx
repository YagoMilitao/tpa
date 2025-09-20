import { motion } from 'framer-motion';
import { Avatar } from './Avatar';
import type { CircleData } from '../types';

interface CircleProps {
  circle: CircleData;
  onCircleClick: (circleId: string) => void;
}

export const Circle = ({ circle, onCircleClick }: CircleProps) => {
  const { title, users, visibleCount, layout } = circle;

  const remainingCount = users.length - visibleCount;
  const hasRemainingUsers = remainingCount > 0;
  
  const actualVisibleCount = hasRemainingUsers ? visibleCount - 1 : visibleCount;
  const visibleUsers = users.slice(0, actualVisibleCount);

  // ... (toda a lógica de cálculo de posição permanece a mesma)
  const getAvatarPosition = (index: number, rowIndex: number, itemIndex: number) => {
    const totalRows = layout.length;
    const itemsInRow = layout[rowIndex];
    const rowSpacing = 60;
    const startY = -(totalRows - 1) * rowSpacing / 2;
    let y = startY + rowIndex * rowSpacing;
    if (rowIndex === 0) y += 15;
    if (rowIndex === totalRows - 1) y -= 15;
    const itemSpacing = 55;
    const startX = -(itemsInRow - 1) * itemSpacing / 2;
    const x = startX + itemIndex * itemSpacing;
    return { x, y };
  };
  const allPositions = [];
  let globalIndex = 0;
  for (let rowIndex = 0; rowIndex < layout.length; rowIndex++) {
    const itemsInRow = layout[rowIndex];
    for (let itemIndex = 0; itemIndex < itemsInRow && globalIndex < visibleCount; itemIndex++) {
      const position = getAvatarPosition(globalIndex, rowIndex, itemIndex);
      allPositions.push(position);
      globalIndex++;
    }
  }
  const avatarPositions = allPositions.slice(0, actualVisibleCount);
  const remainingIndicatorPosition = allPositions[actualVisibleCount];

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative w-96 h-96 cursor-pointer"
        onClick={() => onCircleClick(circle.id)}
      >
        <div className="
          absolute inset-0 border-2 border-white rounded-full opacity-80
        " />

        {/* Título do círculo COM O AJUSTE PARA A ESQUERDA */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 -ml-10"
        >
          <h2 className="text-xl font-bold text-white text-center">
            {title}
          </h2>
        </motion.div>

        {/* ... (resto do código dos Avatares e Indicador) ... */}
        {visibleUsers.map((user, index) => {
          const position = avatarPositions[index];
          return (
            <div
              key={user.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
              }}
            >
              <Avatar user={user} size="md" delay={index * 0.1}/>
            </div>
          );
        })}
        {hasRemainingUsers && remainingIndicatorPosition && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: `calc(50% + ${remainingIndicatorPosition.x}px)`,
              top: `calc(50% + ${remainingIndicatorPosition.y}px)`,
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.3,
                delay: actualVisibleCount * 0.1 + 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="w-12 h-12 rounded-full bg-gray-600 border-2 border-white shadow-md flex items-center justify-center"
            >
              <span className="text-white text-sm font-bold">
                +{remainingCount + 1}
              </span>
            </motion.div>
          </div>
        )}

        {/* Total de usuários no círculo (centralizado) */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 -ml-10 "
        >
          <p className="text-white font-bold text-lg text-center">
            {users.length} perfis
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};