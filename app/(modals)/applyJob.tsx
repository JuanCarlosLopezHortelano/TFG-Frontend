// app/(modals)/applyJob.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';

// Paleta y estilo "neomórfico"
const containerBg = '#E9ECF2'; 
const elementBg   = '#FFFFFF';   
const shadowColor = '#000';

export default function ApplyJobScreen() {
  const router = useRouter();

  // Este param vendrá en la URL: /applyJob?jobId=XYZ
  const { jobId } = useLocalSearchParams<{ jobId?: string }>();
    console.log('params', jobId);
  // Simulamos un userId en tu AuthContext, etc.
  // const { userId } = useAuth(); 
  const userId = '123';

  // Estado para el mensaje
  const [message, setMessage] = useState('');

  function handleSubmit() {
    if (!jobId) {
      Alert.alert('Error', 'No se recibió jobId en los parámetros');
      return;
    }

    // Construimos el objeto Application
    const newApplication = {
      id: uuidv4(),
      jobId,
      userId, 
      message,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    // Aquí harías la llamada a tu API o mock
    console.log('Guardando la application:', newApplication);

    Alert.alert('Solicitud Enviada', 'Tu postulación ha sido enviada correctamente.');
    router.back(); // Regresamos a la pantalla anterior
  }

  function handleCancel() {
    router.back();
  }

  return (
    <View style={styles.container}>
      {/* Contenedor principal con estilo neomórfico */}
      <View style={styles.mainCard}>
        <Text style={styles.title}>
          Aplicar a la Tarea
        </Text>

        {/* Muestra el ID de la tarea */}
        <Text style={styles.jobInfo}>
          ID del Trabajo: <Text style={{ fontWeight: '600' }}>{jobId}</Text>
        </Text>

        {/* Campo de texto para el mensaje */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Mensaje para tu postulación..."
            placeholderTextColor="#999"
            multiline
            value={message}
            onChangeText={setMessage}
          />
        </View>

        {/* Botones de acción */}
        <View style={styles.buttonRow}>
          <Pressable style={[styles.actionButton, styles.submitButton]} onPress={handleSubmit}>
            <Text style={styles.actionButtonText}>Enviar</Text>
          </Pressable>

          <Pressable style={[styles.actionButton, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.actionButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// Estilos neomórficos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: containerBg,
    padding: 20,
    justifyContent: 'center',
  },
  mainCard: {
    backgroundColor: elementBg,
    borderRadius: 20,
    padding: 20,

    // Sombras suaves neomórficas
    shadowColor,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  jobInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    backgroundColor: elementBg,
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,

    // Sombras suaves
    shadowColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    fontSize: 14,
    color: '#333',
    minHeight: 80,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 30,
    paddingVertical: 12,
    backgroundColor: elementBg,
    alignItems: 'center',

    // Sombra neomórfica
    shadowColor,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButton: {
    // Puedes pintar de otro color si quieres, o dejarlo blanco
  },
  cancelButton: {
    // Igual, se mantiene estilo blanco
  },
  actionButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
