// src/models/types.ts (o la ruta que prefieras)

export type UserRole = 'worker' | 'employer';



// src/models/types.ts

/** Un tipo para representar una aptitud o habilidad específica. */
export interface Skill {
  /** Nombre de la aptitud, p. ej. "Comunicación", "Marketing", etc. */
  name: string;
  /** Nivel, 1..5 o "Básico/Intermedio/Avanzado" (opcional). */
  level?: number;
  /** Categoría o etiqueta adicional (opcional). */
  category?: string;
}



export interface User {
  // Identificador único (p.ej. UUID)
  id: string;

  // Datos personales
  name: string;            
  email: string;
  phone: string;           
  avatarUrl: string;       
  location: string;        

  // Perfil
  about: string;           
  
  // Calificación
  rating: number;          // promedio (0-5)
  ratingCount: number;     


    // Aptitudes adicionales
    aptitudes: Skill[];


  // Roles
  roles: UserRole[];       // p.ej. ['worker'] o ['employer'] o ambos

  // Fecha registro
  createdAt: string;
  

}

/** Un “Job” (oferta o tarea) publicada por un usuario (employer). */
export interface Job {
  id: string;                          
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;                    // p.ej. "Eventos", "Hostelería", etc.
  location: string;                    // dónde se realiza
  rate: number;                        // tarifa en €/hora
  duration: string;                    // texto (“4 horas”, “1 día”)
  createdAt: string;                   // fecha de creación (ISO string)

  rating: number;                      // calificación promedio del Job (0 a 5)
  ratingCount: number;                 // número de valoraciones
  postedBy: string;                    // ID del user que publicó
  applicants: string[];                // IDs de usuarios que aplicaron
  status: 'open' | 'in-progress' | 'completed';
}

// models/types.ts

export interface Application {
  /** Identificador único de la solicitud. */
  id: string;
  /** ID del Job al que aplica. */
  jobId: string;
  /** ID del usuario (worker) que se postula. */
  userId: string;
  /** Mensaje opcional con su carta de presentación. */
  message?: string;
  /** Estado actual de la solicitud. */
  status: 'pending' | 'approved' | 'rejected';
  /** Fecha de creación (ISO string). */
  createdAt: string;
}


/** “Activity”: historial de un Job completado con un usuario */
export interface Activity {
  id: string;
  jobId: string;           // referencia a Job
  userId: string;          // quién hizo el trabajo
  title: string;           // copia de Job.title
  date: string;            // fecha de finalización (ISO)
  
  rating: number;          // calificación (0 a 5) que recibió el usuario
  comment: string;         // comentario final
  duration: string;        // “4 horas”
  payment: number;         // € totales pagados
  status: 'completed' | 'pending-feedback';
  createdAt: string;       // fecha de creación del registro
}

/**
 * “Review”: reseña más completa con varias preguntas/valoraciones.
 * Si tu calificación es compleja (distintas categorías) y no cabe solo en “rating/comment” de Activity,
 * usas un objeto Review aparte. 
 */
export interface Review {
  id: string;
  activityId: string;      // la Activity a la que se hace la review
  reviewerId: string;      // quién escribe la review
  revieweeId: string;      // a quién se reseña (el userId, o jobId, etc.)
  createdAt: string;       // fecha
  
  // Para encuestas con varias preguntas
  questionRatings: {
    questionId: string;
    rating: number;        // 1..5
  }[];

  finalComment: string;    // comentario libre
}



/** Solicitudes para un trabajo */
export interface Application {
  id: string;                // Identificador único de la solicitud
  jobId: string;             // ID del trabajo al que aplica
  userId: string;            // ID del usuario que se postula
  message?: string;          // Mensaje adicional o carta de presentación
  status: 'pending' | 'approved' | 'rejected'; // Estado de la solicitud
  createdAt: string;         // Fecha de creación
}