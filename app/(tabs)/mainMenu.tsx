import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  TextInput, 
  ScrollView 
} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* Barra de Búsqueda con icono de usuario y filtro en la misma línea */}
      <View style={styles.searchRow}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar trabajos..."
          placeholderTextColor="#999"
        />
        <Pressable style={styles.iconButton}>
          <Text style={styles.icon}>👤</Text>
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Text style={styles.icon}>🔧</Text>
        </Pressable>
      </View>

      <ScrollView 
        style={styles.mainContent} 
        contentContainerStyle={{paddingBottom: 140}}
      >
        {/* Categorías Locales */}
        <Text style={styles.sectionTitle}>Categorías Locales</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {["Restauración", "Ventas", "Eventos", "Logística", "Limpieza"].map((cat, index) => (
            <View key={index} style={styles.categoryBox}>
              <Text style={styles.categoryText}>{cat}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Trabajos Destacados */}
        <Text style={styles.sectionTitle}>Trabajos Destacados</Text>
        <View style={styles.jobItem}>
          <Text style={styles.jobTitle}>Camarero/a para Evento</Text>
          <Text style={styles.jobDetail}>Ubicación: Centro Ciudad</Text>
          <Text style={styles.jobDetail}>Tarifa: 12€/hora</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ ⭐ ⭐ ⭐ ☆</Text>
            <Text style={styles.ratingCount}>4.0 (23 valoraciones)</Text>
          </View>
          <Text style={styles.commentTitle}>Comentario de un usuario:</Text>
          <Text style={styles.commentText}>
            "Excelente oportunidad, el pago fue puntual y el ambiente muy agradable."
          </Text>
          <Pressable style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Aplicar</Text>
          </Pressable>
        </View>

        <View style={styles.jobItem}>
          <Text style={styles.jobTitle}>Promotor/a Temporada Festiva</Text>
          <Text style={styles.jobDetail}>Ubicación: Centro Comercial</Text>
          <Text style={styles.jobDetail}>Tarifa: 10€/hora</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
            <Text style={styles.ratingCount}>5.0 (10 valoraciones)</Text>
          </View>
          <Text style={styles.commentTitle}>Comentario de un usuario:</Text>
          <Text style={styles.commentText}>
            "Muy buena experiencia, volvería a trabajar con ellos sin dudar."
          </Text>
          <Pressable style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Aplicar</Text>
          </Pressable>
        </View>

        {/* Comentarios Destacados a Trabajos Finalizados */}
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

      {/* Dashboard Inferior */}
      <View style={styles.dashboard}>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardIcon}>🏠</Text>
          <Text style={styles.dashboardText}>Inicio</Text>
        </View>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardIcon}>✅</Text>
          <Text style={styles.dashboardText}>Tareas</Text>
        </View>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardIcon}>💼</Text>
          <Text style={styles.dashboardText}>Publicar</Text>
        </View>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardIcon}>📄</Text>
          <Text style={styles.dashboardText}>Candidaturas</Text>
        </View>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardIcon}>👤</Text>
          <Text style={styles.dashboardText}>Perfil</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 50, // Espacio superior
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  iconButton: {
    marginLeft: 15,
  },
  icon: {
    fontSize: 20,
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
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  jobItem: {
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 20,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  ratingCount: {
    fontSize: 14,
    color: '#777',
  },
  commentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
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
    borderRadius: 6,
    alignItems: 'center',
    width: '50%',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  commentHighlight: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
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
  dashboard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  dashboardItem: {
    alignItems: 'center',
  },
  dashboardIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  dashboardText: {
    fontSize: 14,
    color: '#333',
  },
});
