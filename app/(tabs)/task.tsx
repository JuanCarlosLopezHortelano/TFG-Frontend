import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Image, 
  ScrollView
} from 'react-native';

export default function TaskDetailScreen() {

  const personName = "Andrea G.";
  const personAvatar = { uri: "https://via.placeholder.com/40" };
  const taskTitle = "Montaje de Stand";
  const taskCategory = "Eventos";
  const shortDescription = "Montar un stand en el centro de convenciones para la feria este fin de semana.";
  const longDescription = "La tarea consiste en el montaje completo de un stand promocional. Se requiere organizar el espacio, colocar materiales publicitarios, cuidar la estética y asegurar la correcta disposición del mobiliario. Se espera puntualidad y responsabilidad. El horario es de 9 a 14hs durante el sábado y domingo.";
  const personDetails = "Andrea G. es una promotora con experiencia en eventos y ferias locales. Ha trabajado con distintas marcas ayudando en la organización de stands y promociones.";
  const averageRating = 4.5;
  const lastRating = 5.0;
  const lastComment = "Excelente trabajo, muy organizada y con mucha iniciativa. Recomendadísima.";

  // Ejemplo de tareas similares
  const similarTasks = [
    { id: 1, title: 'Ayudante de Montaje de Escenario', location: 'Teatro Principal', rate: '11€/hora' },
    { id: 2, title: 'Promotor/a en Feria Gastronómica', location: 'Parque Central', rate: '9€/hora' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>

        {/* Contenedor principal */}
        <View style={styles.mainContainer}>

          {/* Parte superior: Título y persona */}
          <Text style={styles.taskTitle}>{taskTitle}</Text>
          <View style={styles.personRow}>
            <Image source={personAvatar} style={styles.avatar} />
            <Text style={styles.personName}>{personName}</Text>
          </View>
          <Text style={styles.taskCategory}>Categoría: {taskCategory}</Text>
          <Text style={styles.shortDescription}>{shortDescription}</Text>

          <Pressable style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Aplicar</Text>
          </Pressable>

          {/* Contenedor neumórfico: Detalles de la persona */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Detalles de la persona</Text>
            <Text style={styles.sectionText}>{personDetails}</Text>
          </View>

          {/* Contenedor neumórfico: Descripción de la tarea */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Descripción de la Tarea</Text>
            <Text style={styles.sectionText}>{longDescription}</Text>
          </View>

          {/* Contenedor neumórfico: Acerca del Solicitante */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Acerca del Solicitante</Text>
            <Text style={styles.sectionText}>Calificaciones medias: ⭐ {averageRating.toFixed(1)}</Text>
            <Text style={styles.sectionText}>Última calificación: ⭐ {lastRating.toFixed(1)}</Text>
            <Text style={styles.sectionText}>Último comentario: "{lastComment}"</Text>

            <Pressable style={styles.moreButton}>
              <Text style={styles.moreButtonText}>Ver más calificaciones</Text>
            </Pressable>
          </View>

          {/* Contenedor neumórfico: Tareas Similares */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Tareas Similares</Text>
            {similarTasks.map((task) => (
              <View key={task.id} style={styles.similarTaskRow}>
                <Text style={styles.similarTaskTitle}>{task.title}</Text>
                <Text style={styles.similarTaskDetail}>Ubicación: {task.location}</Text>
                <Text style={styles.similarTaskDetail}>Tarifa: {task.rate}</Text>
              </View>
            ))}

            <Pressable style={styles.moreButton}>
              <Text style={styles.moreButtonText}>Ver más</Text>
            </Pressable>
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
    shadowOffset: { width: 4, height: 4},
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
  applyButton: {
    backgroundColor: '#4C74D9',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: shadowColor,
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
  moreButton: {
    backgroundColor: '#4C74D9',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: shadowColor,
    shadowOffset: { width: 3, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  similarTaskRow: {
    marginBottom: 15,
  },
  similarTaskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  similarTaskDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
});
