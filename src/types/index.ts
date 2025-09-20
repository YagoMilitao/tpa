// Tipos principais da aplicação
export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  isNew?: boolean;
}

export interface CircleData {
  id: string;
  title: string;
  users: User[];
  visibleCount: number;
  layout: number[]; // Ex: [2, 3, 2] para definir quantos avatares por linha
}

export interface CirclePosition {
  x: number;
  y: number;
  angle: number;
}