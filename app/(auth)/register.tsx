// app/auth/register.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signUp } from '../services/cognitoConfig';
import { useAuthFlow } from '../context/authFlowContext';

export default function RegisterScreen() {
  const { setLastRegisteredEmail } = useAuthFlow();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp() {
    try {
      // Llamamos a signUp enviando email como “username” y también como atributo
      await signUp(email, password, email);
      Alert.alert('¡Usuario registrado!', 'Te enviamos un código. Revisa tu correo.');

      // Guardamos el email en el contexto
      setLastRegisteredEmail(email);

      // Navegamos a la pantalla de confirmación (sin pasar param en la ruta)
      router.push('./confirm');
    } catch (err: any) {
      Alert.alert('Error al registrarte', err.message || JSON.stringify(err));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Registrarme" onPress={handleSignUp} />
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
