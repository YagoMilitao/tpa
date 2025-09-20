import { useState, useCallback } from 'react';
import type { User, CircleData } from '../types';


// Mock de dados dos usuários - em produção viria de uma API
const generateMockUsers = (count: number, startId: number = 0): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const userIndex = startId + i;
    return {
      id: `user-${userIndex}`,
      name: `User ${userIndex + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${(userIndex % 70) + 1}`,
      isOnline: Math.random() > 0.3, // 70% chance de estar online
      isNew: i < 2 && startId === 0, // Primeiros 2 usuários são "novos"
    };
  });
};

export const useCirclesData = () => {
  // Estado inicial dos círculos com dados mock
  const [circles] = useState<CircleData[]>([
    {
      id: 'circle-1',
      title: 'Circle 1', 
      users: generateMockUsers(7),
      visibleCount: 7,
      layout: [2, 3, 2], // Distribuição: 2 em cima, 3 no meio, 2 embaixo
    },
    {
      id: 'circle-2', 
      title: 'Circle 2',
      users: generateMockUsers(35, 7),
      visibleCount: 12,
      layout: [4, 5, 4], // Distribuição: 4-5-4
    },
    {
      id: 'circle-3',
      title: 'Circle 3', 
      users: generateMockUsers(106, 42), // 106 total (19 visíveis + 87 restantes)
      visibleCount: 19,
      layout: [6, 7, 6], // Distribuição: 6-7-6
    },
  ]);

  // Usuários novos para a seção superior
  const [newUsers] = useState<User[]>(
    generateMockUsers(4).map(user => ({ ...user, isNew: true }))
  );

  // Função para obter círculo por ID
  const getCircleById = useCallback((id: string) => {
    return circles.find(circle => circle.id === id);
  }, [circles]);

  return {
    circles,
    newUsers,
    getCircleById,
  };
};