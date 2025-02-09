// app/auth/confirm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { confirmSignUp } from '../../services/cognitoConfig';
import { useAuthFlow } from '../../context/authFlowContext';

export default function ConfirmScreen() {
  const { lastRegisteredEmail } = useAuthFlow();
  const [code, setCode] = useState('');
  const router = useRouter();

  async function handleConfirm() {
    try {
      if (!lastRegisteredEmail) {
        Alert.alert('Error', 'No se tiene el email registrado');
        return;
      }

      // confirmSignUp(email, code)
      await confirmSignUp(lastRegisteredEmail, code);
      Alert.alert('Cuenta confirmada', 'Tu cuenta ha sido validada. Ahora inicia sesión.');

      // Vamos a login
      router.replace('./login');
    } catch (err: any) {
      Alert.alert('Error al confirmar', err.message || JSON.stringify(err));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirma tu cuenta</Text>
      <Text>Hemos enviado un código al correo: {lastRegisteredEmail || '??'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Código de verificación"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />

      <Button title="Confirmar" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
});
