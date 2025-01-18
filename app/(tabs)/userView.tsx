import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView 
} from 'react-native';

export default function ProfileScreen() {

  const userName = "Andrea G.";
  const userAvatar = { uri: "https://via.placeholder.com/100" };
  const userEmail = "andrea@example.com";
  const userAbout = "Promotora de eventos con más de 5 años de experiencia en stands, ferias y promociones. Me apasiona el trato con el público y la organización de actividades que generen una gran experiencia.";
  const aptitudes = ["Comunicación", "Organización", "Puntualidad", "Atención al detalle"];
  
  // Ahora cada actividad tendrá una calificación
  const actividades = [
    {id: 1, title: "Montaje de Stand - Feria Industrial", date: "20/09/2023", rating: 4.0},
    {id: 2, title: "Promoción en Evento Gastronómico", date: "15/09/2023", rating: 5.0},
  ];

  // Media global calculada (ejemplo: si sumamos las calificaciones de actividades)
  const globalRating = (actividades.reduce((sum, act) => sum + act.rating, 0) / actividades.length).toFixed(1);

  const renderStars = (rating: number) => {
    // Representación sencilla: redondear rating y mostrar las estrellas
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    let stars = '⭐'.repeat(fullStars);
    if (hasHalfStar && fullStars < 5) {
      stars += '⭐';
    }
    // Si no se usan medias estrellas, ajusta la lógica según se requiera
    // Aquí simplemente redondeamos, podría ser más complejo.
    // Suponemos que el rating es del 1 al 5.
    return stars.padEnd(5, '☆'); // rellena hasta 5 estrellas con ☆
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>

        {/* Contenedor principal */}
        <View style={styles.mainContainer}>

          {/* Sección superior con foto, nombre y media global */}
          <View style={styles.headerSection}>
            <Image source={userAvatar} style={styles.avatar} />
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.globalRatingText}>Valoración Global: {renderStars(parseFloat(globalRating))} ({globalRating})</Text>
          </View>

          {/* Sección de contacto */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Contacto</Text>
            <Text style={styles.sectionText}>Email: {userEmail}</Text>
          </View>

          {/* Sección Acerca de */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Acerca de</Text>
            <Text style={styles.sectionText}>{userAbout}</Text>
          </View>

          {/* Sección Aptitudes */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Aptitudes</Text>
            {aptitudes.map((apt, index) => (
              <Text key={index} style={styles.aptitudText}>- {apt}</Text>
            ))}
          </View>

          {/* Sección Actividades (con estrellas) */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Actividades Recientes</Text>
            {actividades.map((act) => (
              <View key={act.id} style={styles.activityRow}>
                <Text style={styles.activityTitle}>{act.title}</Text>
                <Text style={styles.activityDate}>{act.date}</Text>
                <Text style={styles.activityRating}>Valoración: {renderStars(act.rating)} ({act.rating.toFixed(1)})</Text>
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
});
