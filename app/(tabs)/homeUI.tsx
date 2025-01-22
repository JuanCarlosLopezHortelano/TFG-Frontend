// app/(tabs)/mainMenu.tsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  TextInput, 
  ScrollView 
} from 'react-native';
// Importamos el mock
import { mockJobs } from '../services/mock/mockJobs';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  // Estado para almacenar los jobs (simulando fetch)
  const [jobs, setJobs] = useState(mockJobs);

  const router = useRouter();


  // Este effect simula que “cargas” los jobs
  useEffect(() => {
    // Normalmente harías un fetch a la API
    // fetch('/api/jobs')...
    // Por ahora, no hace falta porque ya tenemos mockJobs
    setJobs(mockJobs);
  }, []);

  return (
    <View style={styles.container}>

      {/* Fila de búsqueda (ya sin iconos de perfil/config) */}
      <View style={styles.searchRow}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar trabajos..."
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView 
        style={styles.mainContent} 
        contentContainerStyle={{paddingBottom: 180}}
      >
        {/* Categorías Locales (harcodeadas) */}
        <Text style={styles.sectionTitle}>Categorías Locales</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {["Restauración", "Ventas", "Eventos", "Logística", "Limpieza"].map((cat, index) => (
            <View key={index} style={styles.categoryBox}>
              <Text style={styles.categoryText}>{cat}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Trabajos Destacados (mapeo de mockJobs) */}
        <Text style={styles.sectionTitle}>Trabajos Destacados</Text>
        {jobs.map((job) => (
          <View key={job.id} style={styles.jobItem}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobDetail}>Ubicación: {job.location}</Text>
            <Text style={styles.jobDetail}>Tarifa: {job.rate}€/hora</Text>
            
            <Text style={styles.commentTitle}>Valoración:</Text>
            <Text style={styles.commentText}>
              {renderStars(job.rating)} ({job.rating.toFixed(1)}) • {job.ratingCount} valoraciones
            </Text>

            <Text style={styles.commentTitle}>Comentario:</Text>
            <Text style={styles.commentText}>{job.shortDescription}</Text>
            
            <Pressable 
              style={styles.applyButton} 
              onPress={() => router.push({ 
                pathname: "./taskDetailModal",  // si tu screen se llama "taskDetail"
                params: { jobId: job.id } 
              })}
            >
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </Pressable>

          </View>
        ))}

        {/* Comentarios Destacados (ejemplo fijo) */}
        <Text style={styles.sectionTitle}>Comentarios Destacados</Text>
        <View style={styles.commentHighlight}>
          <Text style={styles.commentHighlightText}>
            "Me encantó trabajar con esta empresa, la comunicación fue clara y el pago justo."
          </Text>
          <Text style={styles.commentAuthor}>- Ana M.</Text>
        </View>

        <View style={styles.commentHighlight}>
          <Text style={styles.commentHighlightText}>
            "La experiencia fue excelente, aprendí mucho y el ambiente fue muy agradable."
          </Text>
          <Text style={styles.commentAuthor}>- Carlos G.</Text>
        </View>
      </ScrollView>
    </View>
  );
}


function renderStars(rating: number): string {
    return `⭐ ${rating.toFixed(1)}`; // Limita el número a 1 decimal
  }
  
  
  


const containerBg = '#E9ECF2'; 
const elementBg = '#FFFFFF';  
const shadowColor = '#000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: containerBg,
    paddingTop: 50,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: elementBg,
    borderRadius: 30,
    shadowColor,
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  searchInput: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  categoryBox: {
    backgroundColor: elementBg,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginRight: 15,
    shadowColor,
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  jobItem: {
    backgroundColor: elementBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor,
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  jobDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  commentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginTop: 10,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: '#4C74D9',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
    shadowColor,
    shadowOffset: { width: 3, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  commentHighlight: {
    backgroundColor: elementBg,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor,
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  commentHighlightText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 10,
  },
  commentAuthor: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
