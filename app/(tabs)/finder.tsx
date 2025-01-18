import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  ScrollView 
} from 'react-native';

export default function SearchScreen() {
  const [filter, setFilter] = useState<'todo' | 'tareas' | 'personas'>('todo');
  const [searchFocused, setSearchFocused] = useState(false);

  const tareas = [
    {id: 1, title: 'Montaje de Stand', location: 'Centro Convenciones', rate: '10€/hora'},
    {id: 2, title: 'Reparto de Flyers', location: 'Zona Comercial', rate: '9€/hora'},
  ];

  const personas = [
    {id: 1, name: 'Andrea G.', skill: 'Promotora de eventos', rating: 4.5},
    {id: 2, name: 'Juan P.', skill: 'Camarero con experiencia', rating: 4.0},
  ];

  const showTareas = filter === 'todo' || filter === 'tareas';
  const showPersonas = filter === 'todo' || filter === 'personas';

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <View style={styles.topBar}>
        {/* Pequeño buscador */}
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#999"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </View>

        {/* Si el buscador está en foco, mostrar "…" en vez de los filtros */}
        {searchFocused ? (
          <Pressable style={styles.dotButton}>
            <Text style={styles.dotButtonText}>…</Text>
          </Pressable>
        ) : (
          <View style={styles.filterContainer}>
            <Pressable 
              style={[styles.filterButton, filter === 'todo' && styles.filterButtonActive]} 
              onPress={() => setFilter('todo')}
            >
              <Text style={[styles.filterButtonText, filter === 'todo' && styles.filterButtonTextActive]}>
                Todo
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.filterButton, filter === 'tareas' && styles.filterButtonActive]} 
              onPress={() => setFilter('tareas')}
            >
              <Text style={[styles.filterButtonText, filter === 'tareas' && styles.filterButtonTextActive]}>
                Tareas
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.filterButton, filter === 'personas' && styles.filterButtonActive]} 
              onPress={() => setFilter('personas')}
            >
              <Text style={[styles.filterButtonText, filter === 'personas' && styles.filterButtonTextActive]}>
                Personas
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      <ScrollView style={styles.resultsContainer} contentContainerStyle={{paddingBottom: 100}}>
        
        {/* Sección de Tareas */}
        {showTareas && (
          <>
            <Text style={styles.sectionTitle}>Tareas Disponibles</Text>
            {tareas.map((t) => (
              <View key={t.id} style={styles.taskCard}>
                <Text style={styles.taskTitle}>{t.title}</Text>
                <Text style={styles.taskDetail}>Ubicación: {t.location}</Text>
                <Text style={styles.taskDetail}>Tarifa: {t.rate}</Text>
              </View>
            ))}
          </>
        )}

        {/* Sección de Personas */}
        {showPersonas && (
          <>
            <Text style={styles.sectionTitle}>Personas Disponibles</Text>
            {personas.map((p) => (
              <View key={p.id} style={styles.personCard}>
                <Text style={styles.personName}>{p.name}</Text>
                <Text style={styles.personDetail}>{p.skill}</Text>
                <Text style={styles.personDetail}>Valoración: ⭐ {p.rating}</Text>
              </View>
            ))}
          </>
        )}

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
    paddingTop: 30, // Menos padding top para que el buscador esté más arriba
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: elementBg,
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    justifyContent: 'space-between',
    shadowColor: shadowColor,
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  searchWrapper: {
    flex: 1,
    marginRight: 15,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: elementBg,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 5,
    shadowColor: shadowColor,
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: '#4C74D9',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  dotButton: {
    backgroundColor: elementBg,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 5,
    shadowColor: shadowColor,
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  dotButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  taskCard: {
    backgroundColor: elementBg,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: shadowColor,
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
  personCard: {
    backgroundColor: elementBg,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: shadowColor,
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  personDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});
