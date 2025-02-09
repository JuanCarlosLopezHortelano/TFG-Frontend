// src/services/mockReviews.ts
import { Review } from '../../types/types';

export const mockReviews: Review[] = [
  {
    id: 'review-001',
    activityId: 'activity-001',
    reviewerId: 'user-001',
    revieweeId: 'user-002',
    createdAt: '2025-01-14T18:30:00Z',
    questionRatings: [
      { questionId: 'punctuality', rating: 5 },
      { questionId: 'communication', rating: 4 },
      { questionId: 'efficiency', rating: 4.5 },
    ],
    finalComment: 'Buen trabajo, aunque podría mejorar la comunicación.',
  },
  {
    id: 'review-002',
    activityId: 'activity-002',
    reviewerId: 'user-004',
    revieweeId: 'user-001',
    createdAt: '2025-01-11T14:00:00Z',
    questionRatings: [
      { questionId: 'punctuality', rating: 5 },
      { questionId: 'teamwork', rating: 4.8 },
      { questionId: 'efficiency', rating: 5 },
    ],
    finalComment: 'Superó nuestras expectativas, volvería a contratar.',
  },
];
