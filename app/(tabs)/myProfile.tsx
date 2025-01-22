// app/(tabs)/MyProfileScreen.tsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  Pressable,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Calendar } from 'react-native-calendars';

// Importa tus mocks
import { mockUsers } from '../services/mock/mockUser';
import { mockActivities } from '../services/mock/mockActivities';
import { mockJobs } from '../services/mock/mockJobs';

const screenWidth = Dimensions.get('window').width;
// Define the type for acc
type MarkedDates = {
  [key: string]: {
    marked: boolean;
    dotColor: string;
  };
};
export default function MyProfileScreen() {
  // Suponemos que el usuario actual es 'u123'
  const me = mockUsers.find((u) => u.id === 'u123') || mockUsers[0];

  // Filtramos actividades completadas
  const myActivities = mockActivities.filter((act) => act.userId === me.id);

  // Generamos un objeto para resaltar fechas en el calendario
  const markedDates: MarkedDates = myActivities.reduce((acc: MarkedDates, act) => {
    acc[act.date] = { marked: true, dotColor: '#4C74D9' };
    return acc;
  }, {})

  // Preparamos datos para el gráfico de barras (calificaciones en cada actividad)
  const chartData = {
    labels: myActivities.map((act) => act.date.slice(5)), // ejemplo: "10-20"
    datasets: [{ data: myActivities.map((act) => act.rating) }],
  };

  function handleEditProfile() {
    alert('Ir a la pantalla de Editar Perfil...');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      
      {/* Encabezado del perfil */}
      <View style={styles.headerSection}>
        <Image source={{ uri: me.avatarUrl }} style={styles.avatar} />
        <Text style={styles.userName}>{me.name}</Text>
        <Text style={styles.ratingText}>
          ⭐ {me.rating.toFixed(1)} ({me.ratingCount} valoraciones)
        </Text>
        
        <Text style={styles.aboutText}>{me.about}</Text>
      </View>

     
       {/* Sección de contacto */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Contacto</Text>
                  <Text style={styles.sectionText}>Email: {me.email}</Text>
                  {me.phone && <Text style={styles.sectionText}>Teléfono: {me.phone}</Text>}
                </View>
    
                {/* Sección Acerca de */}
                
                          {/* Sección Acerca de */}
                          <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Acerca de</Text>
                            <Text style={styles.sectionText}>{me.about}</Text>
                          </View>


        {/* Sección Aptitudes */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Aptitudes</Text>
                  {me.aptitudes.map((apt, index) => (
                    <Text key={index} style={styles.aptitudText}>- {apt.name}</Text>
                  ))}
                </View>

         

      {/* Botón para Editar Perfil */}
      <Pressable style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </Pressable>

    

      {/* Actividades Completadas */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Actividades Completadas</Text>
        {myActivities.length === 0 ? (
          <Text style={styles.emptyText}>Aún no has completado actividades.</Text>
        ) : (
          myActivities.map((act) => (
            <View key={act.id} style={styles.activityRow}>
              <Text style={styles.activityTitle}>
                {act.title} ({act.date})
              </Text>
              <Text style={styles.activityDetail}>
                Valoración: ⭐ {act.rating.toFixed(1)} | Pago: {act.payment}€
              </Text>
            </View>
          ))
        )}
      </View>

        {/* Calendario */}
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Calendario de Actividades</Text>
        <Calendar
          markedDates={markedDates} // Pasamos las fechas marcadas
          theme={{
            selectedDayBackgroundColor: '#4C74D9',
            todayTextColor: '#4C74D9',
            arrowColor: '#4C74D9',
          }}
        />
      </View>

      {/* Gráfico de Calificaciones */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Resumen de Calificaciones</Text>
        {myActivities.length === 0 ? (
          <Text style={styles.emptyText}>No hay calificaciones todavía.</Text>
        ) : (
          <BarChart
            data={chartData}
            width={screenWidth - 60}
            height={220}
            yAxisSuffix=''
            yAxisLabel="Puntos"
            chartConfig={{
              backgroundGradientFrom: '#f5f5f5',
              backgroundGradientTo: '#f5f5f5',
              color: (opacity = 1) => `rgba(76, 116, 217, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              barPercentage: 0.6,
            }}
            style={{ borderRadius: 10 }}
          />
        )}
      </View>
    </ScrollView>
  );
}

const elementBg = '#FFFFFF'; 
const shadowColor = '#000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9ECF2',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 30,
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
  editButton: {
    backgroundColor: '#4C74D9',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
    width: 150,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  sectionContainer: {
    backgroundColor: elementBg,
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
    shadowColor,
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
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  activityRow: {
    marginBottom: 15,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  activityDetail: {
    fontSize: 14,
    color: '#555',
  },
});
