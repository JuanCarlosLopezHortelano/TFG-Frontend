import { User, Skill } from '../../../types/types';

const skillComunicacion: Skill = { name: 'Comunicación', level: 5 };
const skillOrganizacion: Skill = { name: 'Organización', level: 4 };
const skillPuntualidad: Skill = { name: 'Puntualidad', level: 5 };
const skillTrabajoEnEquipo: Skill = { name: 'Trabajo en equipo', level: 4 };

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Andrea García',
    email: 'andrea@example.com',
    phone: '+34 612 345 678',
    avatarUrl: 'https://via.placeholder.com/100',
    location: 'Madrid, España',
    about:
      'Promotora de eventos con más de 5 años de experiencia en ferias y promociones. Me apasiona el trato con el público.',
    aptitudes: [skillComunicacion, skillOrganizacion, skillPuntualidad, skillTrabajoEnEquipo],
    rating: 4.8,
    ratingCount: 120,
    roles: ['worker'],
    createdAt: '2020-05-15T09:00:00Z',
  },
  {
    id: 'user-002',
    name: 'Carlos Fernández',
    email: 'carlos@example.com',
    phone: '+34 645 678 901',
    avatarUrl: 'https://via.placeholder.com/100',
    location: 'Barcelona, España',
    about: 'Especialista en logística y tareas de almacén. Experiencia de 8 años.',
    aptitudes: [
      { name: 'Rapidez', level: 5 },
      { name: 'Eficiencia', level: 5 },
      { name: 'Trabajo físico', level: 4 },
      { name: 'Responsabilidad', level: 5 },
    ],
    rating: 4.7,
    ratingCount: 85,
    roles: ['worker', 'employer'],
    createdAt: '2018-03-22T09:00:00Z',
  },
];
