import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView 
} from 'react-native';

// Datos simulados: Tareas que el usuario publicó y candidaturas en las que participó.
const mockPublished = [
  {
    id: 1,
    title: 'Montaje de Stand - Feria',
    status: 'Abierta', // o "En proceso", "Cerrada"...
    applicants: 5,     // cuántas personas se han postulado
  },
  {
    id: 2,
    title: 'Distribución de Flyers',
    status: 'En proceso',
    applicants: 2,
  },
];

const mockCandidaturas = [
  {
    id: 101,
    title: 'Promoción Evento Deportivo',
    date: '12/10/2023',
    status: 'Pendiente de Aprobación',
  },
  {
    id: 102,
    title: 'Animador Infantil',
    date: '08/10/2023',
    status: 'Rechazada',
  },
];

export default function MyPostulationsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        
        {/* Sección Tareas Publicadas */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tus Tareas Publicadas</Text>
          {mockPublished.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDetail}>Estado: {task.status}</Text>
              <Text style={styles.taskDetail}>
                {task.applicants} postulantes
              </Text>
            </View>
          ))}
        </View>

        {/* Sección Candidaturas */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tus Candidaturas</Text>
          {mockCandidaturas.map((cand) => (
            <View key={cand.id} style={styles.taskCard}>
              <Text style={styles.taskTitle}>{cand.title}</Text>
              <Text style={styles.taskDetail}>Fecha: {cand.date}</Text>
              <Text style={styles.taskDetail}>Estado: {cand.status}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

/** Estilos Neumórficos */
const containerBg = '#E9ECF2'; 
const elementBg = '#FFFFFF';   
const shadowColor = '#000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: containerBg,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    backgroundColor: elementBg,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: shadowColor,
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  taskCard: {
    backgroundColor: elementBg,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: shadowColor,
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  taskDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});
