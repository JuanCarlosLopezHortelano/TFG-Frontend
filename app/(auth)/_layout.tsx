// app/auth/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { AuthFlowProvider } from '../../context/authFlowContext';

console.log('Auth Layout cargado');

export default function AuthLayout() {
  return (
    // Envolvemos todo con AuthFlowProvider
    <AuthFlowProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ title: 'Iniciar sesión' }} />
        <Stack.Screen name="register" options={{ title: 'Registrarse' }} />
        <Stack.Screen name="confirm" options={{ title: 'Confirmar cuenta' }} />
      </Stack>
    </AuthFlowProvider>
  );
}
