import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import signIn from '../../services/cognitoConfig';
import { AuthContext } from '../../context/authContext';
import { useAuthFlow } from '@/context/authFlowContext';

export default function LoginScreen() {

  const {lastRegisteredEmail} = useAuthFlow();


  const { signIn: signInContext } = React.useContext(AuthContext);
  const [email, setEmail] = useState(lastRegisteredEmail || '');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    try {
      const { user, session } = await signIn(email, password);
      Alert.alert('Inicio de sesión correcto', `¡Bienvenido, ${user.getUsername()}!`);
      console.log('SignIn user:', user);
      const token = session.getIdToken().getJwtToken();
      // Notificamos al contexto que se ha iniciado sesión
      signInContext(token);

      // Redirigimos al layout de tabs
      router.replace('/(tabs)');
    } catch (err: any) {
      console.error('Error signIn:', err);
      Alert.alert(
        'Error al iniciar sesión',
        err.message || 'Ocurrió un error inesperado.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autenticación con Cognito</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Iniciar sesión" onPress={handleSignIn} />

      {/* Enlace a la pantalla de registro */}
      <Link href="./register" style={styles.link}>
        ¿No tienes cuenta? Regístrate
      </Link>
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
  link: {
    marginTop: 15,
    color: '#0066cc',
    textAlign: 'center',
  },
});
