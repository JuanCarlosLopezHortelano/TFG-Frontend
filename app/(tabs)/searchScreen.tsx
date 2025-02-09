import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  ScrollView, 
  Image
} from 'react-native';

// Mocks
import { mockJobs } from '../../services/mock/mockJobs';
import { mockUsers } from '../../services/mock/mockUser';
import { router } from 'expo-router';

export default function SearchScreen() {
  const [filter, setFilter] = useState<'todo' | 'tareas' | 'personas'>('todo');
  const [searchFocused, setSearchFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Diccionario de íconos para cada categoría (opcional)
  const categoryIcons: Record<string, string> = {
    Eventos: '🎉',
    Marketing: '📢',
    Hostelería: '🍽',
    Logística: '🚚',
    Limpieza: '🧹',
    // Añade más según tus categorías
  };

  // Tareas: Vienen de mockJobs
  const tareas = mockJobs;
  // Personas: Podrías filtrar por roles.includes('worker') o algo similar
  const personas = mockUsers.filter((u) => u.aptitudes);

  const showTareas = filter === 'todo' || filter === 'tareas';
  const showPersonas = filter === 'todo' || filter === 'personas';

  function handleOpenJobDetail(jobId: string) {
  //  alert(`Ver detalle de la tarea con id = ${jobId}`);
     router.push({ pathname: '/taskDetailModal', params: { jobId } })
  }

  function handleOpenProfile(userId: string) {
    //alert(`Ver perfil del userId = ${userId}`);
     router.push({ pathname: '/userDetails', params: { userId } })
  }

  return (
    <View style={styles.container}>
      
      {/* Barra Superior */}
      <View style={styles.topBar}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#999"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </View>

        <Pressable 
          style={styles.dotButton}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dotButtonText}>…</Text>
        </Pressable>
      </View>

        {/* Filtros */}
        {showDropdown && (
        <View style={styles.dropdown}>
          <Pressable 
            style={[styles.dropdownItem, filter === 'todo' && styles.dropdownItemActive]} 
            onPress={() => { setFilter('todo'); setShowDropdown(false); }}
          >
            <Text style={[styles.dropdownItemText, filter === 'todo' && styles.dropdownItemTextActive]}>Todo</Text>
          </Pressable>
          <Pressable 
            style={[styles.dropdownItem, filter === 'tareas' && styles.dropdownItemActive]} 
            onPress={() => { setFilter('tareas'); setShowDropdown(false); }}
          >
            <Text style={[styles.dropdownItemText, filter === 'tareas' && styles.dropdownItemTextActive]}>Tareas</Text>
          </Pressable>
          <Pressable 
            style={[styles.dropdownItem, filter === 'personas' && styles.dropdownItemActive]} 
            onPress={() => { setFilter('personas'); setShowDropdown(false); }}
          >
            <Text style={[styles.dropdownItemText, filter === 'personas' && styles.dropdownItemTextActive]}>Personas</Text>
          </Pressable>
        </View>
      )}

        
      {/* Resultados */}
      <ScrollView style={styles.resultsContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Sección de Tareas */}
        {showTareas && (
          <>
            <Text style={styles.sectionTitle}>Tareas Disponibles</Text>
            {tareas.map((job) => {
              const employer = mockUsers.find((u) => u.id === job.postedBy);
              // Ícono de categoría
              const catIcon = categoryIcons[job.category] || '🛠';

              return (
                <View key={job.id} style={styles.taskCard}>
                  {/* Encabezado: employer + link a job detail */}
                  <View style={styles.taskHeader}>
                    {employer && (
                      <Pressable onPress={() => handleOpenProfile(employer.id)} style={styles.employerContainer}>
                        <Image source={{ uri: employer.avatarUrl }} style={styles.employerAvatar} />
                        <Text style={styles.employerName}>{employer.name}</Text>
                      </Pressable>
                    )}
                    <Pressable onPress={() => handleOpenJobDetail(job.id)}>
                      <Text style={styles.moreLink}>Ver más</Text>
                    </Pressable>
                  </View>

                  {/* Ícono de categoría y título */}
                  <Text style={styles.taskTitle}>
                    {catIcon} {job.title}
                  </Text>
                  <Text style={styles.taskDetail}>Categoría: {job.category}</Text>
                  <Text style={styles.taskDetail}>Ubicación: {job.location}</Text>
                  <Text style={styles.taskDetail}>Tarifa: {job.rate} €/hora</Text>

                  {/* Breve descripción */}
                  {job.shortDescription && (
                    <Text style={styles.taskDesc}>
                      {job.shortDescription}
                    </Text>
                  )}
                </View>
              );
            })}
          </>
        )}

        {/* Sección de Personas */}
        {showPersonas && (
          <>
            <Text style={styles.sectionTitle}>Personas Disponibles</Text>
            {personas.map((p) => (
              <View key={p.id} style={styles.personCard}>
                <View style={styles.personHeader}>
                  <Image source={{ uri: p.avatarUrl }} style={styles.personAvatar} />
                  <View style={styles.personInfo}>
                    <Text style={styles.personName}>{p.name}</Text>
                    {/* Muestra cuántas aptitudes tiene, o rating si existe */}
                    <Text style={styles.personSkill}>
                      {p.aptitudes.length} aptitudes
                    </Text>
                    <Text style={styles.personRating}>Valoración: ⭐ {p.rating.toFixed(1)}</Text>
                  </View>
                </View>
                <Pressable style={styles.personMoreBtn} onPress={() => handleOpenProfile(p.id)}>
                  <Text style={styles.personMoreText}>Ver Perfil</Text>
                </Pressable>
              </View>
            ))}
          </>
        )}

      </ScrollView>
    </View>
  );
}

// Estilos
const containerBg = '#E9ECF2'; 
const elementBg = '#FFFFFF';   
const shadowColor = '#000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: containerBg,
    paddingTop: 30,
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
    shadowColor,
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
  
  dotButton: {
    backgroundColor: elementBg,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 5,
    shadowColor,
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
   /* Dropdown de filtros */
   dropdown: {
    backgroundColor: elementBg,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownItemActive: {
    backgroundColor: '#4C74D9',
    borderRadius: 5,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  dropdownItemTextActive: {
    color: '#fff',
  },

  /*RESULTADOS*/
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
  // Tareas
  taskCard: {
    backgroundColor: elementBg,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor,
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  employerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  employerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  employerName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  moreLink: {
    fontSize: 14,
    color: '#4C74D9',
    textDecorationLine: 'underline',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  taskDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  taskDesc: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    fontStyle: 'italic',
  },
  // Personas
  personCard: {
    backgroundColor: elementBg,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor,
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  personHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  personAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  personSkill: {
    fontSize: 14,
    color: '#555',
  },
  personRating: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  personMoreBtn: {
    backgroundColor: '#4C74D9',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  personMoreText: {
    color: '#fff',
    fontSize: 14,
  },
});
