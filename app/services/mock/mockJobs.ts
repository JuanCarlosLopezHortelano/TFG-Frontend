// app/services/mockJobs.ts
import { Job } from '../../../types/types';

export const mockJobs: Job[] = [
  {
    id: 'job-001',
    title: 'Camarero/a para Evento',
    shortDescription: 'Atender invitados y servir bebidas en un evento privado.',
    longDescription:
      'Se busca camarero/a con experiencia para un evento privado de 4 horas. Incluye atención a invitados, servicio de bebidas y limpieza básica al finalizar. Se requiere vestimenta formal (camisa blanca y pantalón negro).',
    category: 'Eventos',
    location: 'Centro de la Ciudad',
    rate: 12, // €/hora
    duration: '4 horas',
    createdAt: '2025-01-12T10:00:00Z',
    rating: 4.2,
    ratingCount: 18,
    postedBy: 'user-001', // ID del empleador
    applicants: ['user-002', 'user-003'], // IDs de trabajadores que aplicaron
    status: 'open',
  },
  {
    id: 'job-002',
    title: 'Mozo/a de Almacén',
    shortDescription: 'Ayuda en tareas de carga y descarga en un almacén.',
    longDescription:
      'Se necesita mozo/a de almacén para realizar tareas de carga y descarga en el almacén central. Trabajo físico con horario de 8:00 a 12:00 durante 3 días consecutivos.',
    category: 'Logística',
    location: 'Polígono Industrial',
    rate: 11,
    duration: '3 días (4 horas por día)',
    createdAt: '2025-01-10T08:00:00Z',
    rating: 4.5,
    ratingCount: 25,
    postedBy: 'user-004',
    applicants: ['user-005'],
    status: 'open',
  },
  {
    id: 'job-003',
    title: 'Promotor/a Temporada Festiva',
    shortDescription: 'Promoción en un centro comercial durante Navidad.',
    longDescription:
      'Se busca promotor/a para informar sobre productos y promociones en un centro comercial durante la campaña navideña. Trabajo de 6 horas por día durante una semana.',
    category: 'Promoción',
    location: 'Centro Comercial Las Palmas',
    rate: 10,
    duration: '1 semana (6 horas por día)',
    createdAt: '2025-01-08T15:00:00Z',
    rating: 5,
    ratingCount: 12,
    postedBy: 'user-006',
    applicants: [],
    status: 'open',
  },
];