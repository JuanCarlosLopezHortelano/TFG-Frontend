// app/services/mockActivities.ts
import { Activity } from '../../types/types';


export const mockActivities: Activity[] = [
            {
            id: 'activity-001',
            jobId: 'job-001',
            userId: 'user-001',
            title: 'Camarero/a para Evento',
            date: '2025-01-14T15:00:00Z',
            rating: 4.5,
            comment: 'Excelente desempeño. Muy atento y profesional.',
            duration: '4 horas',
            payment: 48, // 12€/hora * 4 horas
            status: 'completed',
            createdAt: '2025-01-14T18:00:00Z',
            },
            {
            id: 'activity-002',
            jobId: 'job-002',
            userId: 'user-001',
            title: 'Mozo/a de Almacén',
            date: '2025-01-11T12:00:00Z',
            rating: 4.8,
            comment: 'Rápido y eficiente, cumplió con las expectativas.',
            duration: '4 horas',
            payment: 44, // 11€/hora * 4 horas
            status: 'completed',
            createdAt: '2025-01-11T13:00:00Z',
            },
        ];