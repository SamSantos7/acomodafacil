// Arquivo de banco de dados simulado para desenvolvimento

import { v4 as uuidv4 } from 'uuid';

// Tipos
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  ownerId: string;
  createdAt: Date;
}

// Dados simulados
const users: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@exemplo.com',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@exemplo.com',
    createdAt: new Date(),
  },
];

const properties: Property[] = [
  {
    id: '1',
    title: 'Apartamento no Centro',
    description: 'Lindo apartamento com 2 quartos no centro da cidade',
    price: 1500,
    location: 'São Paulo, SP',
    ownerId: '1',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Casa na Praia',
    description: 'Casa espaçosa com vista para o mar',
    price: 2500,
    location: 'Florianópolis, SC',
    ownerId: '2',
    createdAt: new Date(),
  },
];

// Funções do banco de dados
export async function getUsers() {
  return [...users];
}

export async function getUserById(id: string) {
  return users.find(user => user.id === id);
}

export async function getUserByEmail(email: string) {
  return users.find(user => user.email === email);
}

export async function createUser(data: Omit<User, 'id' | 'createdAt'>) {
  const newUser: User = {
    id: uuidv4(),
    ...data,
    createdAt: new Date(),
  };
  
  users.push(newUser);
  return newUser;
}

export async function getProperties() {
  return [...properties];
}

export async function getPropertyById(id: string) {
  return properties.find(property => property.id === id);
}

export async function createProperty(data: Omit<Property, 'id' | 'createdAt'>) {
  const newProperty: Property = {
    id: uuidv4(),
    ...data,
    createdAt: new Date(),
  };
  
  properties.push(newProperty);
  return newProperty;
}

export async function getPropertiesByOwnerId(ownerId: string) {
  return properties.filter(property => property.ownerId === ownerId);
}

// Exportar funções e tipos
export type { User, Property };