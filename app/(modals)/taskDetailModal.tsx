import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Para obtener parámetros dinámicos
import { mockJobs } from '../../services/mock/mockJobs';

export default function TaskDetailScreen() {
    const { jobId } = useLocalSearchParams<{
      jobId?: string;
    }>(); 
  


  // Obtenemos el trabajo del mock usando el ID pasado como parámetro
  const job = mockJobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>No se encontró la información de la tarea.</Text>
      </View>
    );
  }

  // Datos simulados del solicitante
  const personName = 'Andrea G.';
  const personAvatar = { uri: 'https://via.placeholder.com/40' };
  const averageRating = job.rating || 0;
  const lastRating = 5.0; // Ejemplo de calificación reciente
  const lastComment = 'Excelente trabajo, muy organizada y con mucha iniciativa. Recomendadísima.';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Contenedor principal */}
        <View style={styles.mainContainer}>
          <Text style={styles.taskTitle}>{job.title}</Text>

          <View style={styles.personRow}>
            <Image source={personAvatar} style={styles.avatar} />
            <Text style={styles.personName}>{personName}</Text>
          </View>
          <Text style={styles.taskCategory}>Categoría: {job.category}</Text>
          <Text style={styles.shortDescription}>{job.shortDescription}</Text>
          <Text style={styles.rateText}>Pago: {job.rate} €/hora</Text>

          <Pressable style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Aplicar</Text>
          </Pressable>

          {/* Detalles de la tarea */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Descripción de la Tarea</Text>
            <Text style={styles.sectionText}>{job.longDescription}</Text>
          </View>

          {/* Acerca del solicitante */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Acerca del Solicitante</Text>
            <Text style={styles.sectionText}>Calificaciones medias: ⭐ {averageRating.toFixed(1)}</Text>
            <Text style={styles.sectionText}>Última calificación: ⭐ {lastRating.toFixed(1)}</Text>
            <Text style={styles.sectionText}>Último comentario: "{lastComment}"</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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
  mainContainer: {
    backgroundColor: elementBg,
    borderRadius: 20,
    padding: 20,
    shadowColor: shadowColor,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  personName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  taskCategory: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  shortDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    lineHeight: 20,
  },
  rateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: '#4C74D9',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: shadowColor,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionContainer: {
    backgroundColor: elementBg,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: shadowColor,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 10,
  },
});
