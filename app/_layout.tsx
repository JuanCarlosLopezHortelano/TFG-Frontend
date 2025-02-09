
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState, useMemo, useContext } from 'react';
import { View, Text } from 'react-native';
import 'react-native-reanimated';
import { AuthFlowProvider } from '../context/authFlowContext';
import * as SecureStore from 'expo-secure-store';
import { useColorScheme } from '@/components/useColorScheme';
import { AuthProvider, AuthContext } from '../context/authContext';

// Configuración de expo-router
export { ErrorBoundary } from 'expo-router';
export const unstable_settings = {
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Muestra algo mientras cargan fuentes
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

/** 
 * AppNavigator: Separa la parte de la lógica
 * de redirecciones en un componente distinto para claridad.
 */
function AppNavigator() {
  const { userToken, isLoading } = React.useContext(AuthContext);
  console.log('userToken', userToken);
  console.log('isLoading', isLoading);
  const pathname = usePathname();
  const router = useRouter();

  // Rutas que requieren autenticación
  const protectedRoutes = [
    '/homeUI',
    '/myPostulations',
    '/myProfile',
    '/searchScreen',
  ];

  // Efecto para redirigir si no hay token en una ruta protegida
  useEffect(() => {
    if (isLoading) return; // Espera a que termine de cargar el token

    const isProtected = protectedRoutes.includes(pathname);
    if (!userToken && isProtected) {
      router.replace('/(auth)/login');
    }
  }, [pathname, userToken, isLoading]);

  // Mientras isLoading es true, mostramos un splash temporal
  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return (
    <Stack>
      {userToken ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
      <Stack.Screen
        name="taskDetail"
        options={{
          headerShown: true,
          presentation: 'card',
          animation: 'slide_from_right',
          title: 'Oferta de Trabajo',
        }}
      />
      <Stack.Screen
        name="userDetails"
        options={{
          headerShown: true,
          presentation: 'card',
          animation: 'slide_from_bottom',
          title: 'Perfil de Usuario',
        }}
      />

    </Stack>
  );
}

function SplashScreenComponent() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cargando...</Text>
    </View>
  );
}
