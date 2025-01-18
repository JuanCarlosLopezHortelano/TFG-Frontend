import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import 'react-native-reanimated';
import { AuthFlowProvider } from '../context/authFlowContext';
import * as SecureStore from 'expo-secure-store';
import { useColorScheme } from '@/components/useColorScheme';

// --------------------------------
// Contexto de Auth
// --------------------------------
export const AuthContext = React.createContext<{
  userToken: string | null;
  signIn: () => void;
  signOut: () => void;
}>(null!);

// --------------------------------
// Configuración de expo-router
// --------------------------------
export {
  ErrorBoundary,
} from 'expo-router';

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
  const pathname = usePathname();

  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  const router = useRouter();
  // Simula la carga del token
    useEffect(() => {
    async function loadToken() {
      try {
        // Lee el token guardado
        const storedAccessToken = await SecureStore.getItemAsync('accessToken');
        if (storedAccessToken) {
          // Chequea si todavía es válido (opcional, ver paso 3)
          setUserToken(storedAccessToken);
        }
      } catch (err) {
        console.log('Error loading token', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadToken();
  }, []);

  const protectedRoutes = ['/','/one' ,'/two', '/tabs', '/another-tab', '/index'];

  useEffect(() => {
    console.log('Verificando acceso a rutas...');
    if (isLoading) return;

    // Redirigir a login si no está autenticado
    const isProtectedRoute = protectedRoutes.includes(pathname);
    if (!userToken && isProtectedRoute) {
      console.log(`Acceso restringido a ${pathname}: Redirigiendo a /login`);
      router.replace('/(auth)/login');
    }
  }, [isLoading, userToken, pathname]);

  const authContextValue = useMemo(
    () => ({
      userToken,
      signIn: () => setUserToken('dummy-token'),
      signOut: () => setUserToken(null),
    }),
    [userToken]
  );

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {userToken ? (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          )}
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

function SplashScreenComponent() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cargando...</Text>
    </View>
  );
}
