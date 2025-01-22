import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { mockUsers } from '../services/mock/mockUser';
import { mockActivities } from '../services/mock/mockActivities';

export default function ProfileScreen() {
  // Usamos el primer usuario del mock como ejemplo
  const user = mockUsers[0];

  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>No se encontró información del usuario.</Text>
      </View>
    );
  }

  // Filtramos las actividades del usuario
  const userActivities = mockActivities.filter((act) => act.userId === user.id);

  // Calculamos la media global de valoraciones
  const globalRating =
    userActivities.reduce((sum, act) => sum + act.rating, 0) / userActivities.length || 0;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Contenedor principal */}
        <View style={styles.mainContainer}>
          {/* Sección superior */}
          <View style={styles.headerSection}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.globalRatingText}>Valoración Global: ⭐ {globalRating.toFixed(1)}</Text>
          </View>

          {/* Sección de contacto */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Contacto</Text>
            <Text style={styles.sectionText}>Email: {user.email}</Text>
            {user.phone && <Text style={styles.sectionText}>Teléfono: {user.phone}</Text>}
          </View>

          {/* Sección Acerca de */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Acerca de</Text>
            <Text style={styles.sectionText}>{user.about}</Text>
          </View>

          {/* Sección Aptitudes */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Aptitudes</Text>
              {user.aptitudes.map((apt, index) => (
                <Text key={index} style={styles.aptitudText}>
                  - {apt.name}
                </Text>
              ))}
            </View>


          {/* Sección Actividades Recientes */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Actividades Recientes</Text>
            {userActivities.map((act) => (
              <View key={act.id} style={styles.activityRow}>
                <Text style={styles.activityTitle}>{act.title}</Text>
                <Text style={styles.activityDate}>{act.date}</Text>
                <Text style={styles.activityRating}>Valoración: ⭐ {act.rating.toFixed(1)}</Text>
                <Text style={styles.activityComment}>Comentario: "{act.comment}"</Text>
              </View>
            ))}
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
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  globalRatingText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
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
  aptitudText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 5,
  },
  activityRow: {
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  activityDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  activityRating: {
    fontSize: 14,
    color: '#555',
  },
  activityComment: {
    fontSize: 14,
    color: '#555',
  },
});
