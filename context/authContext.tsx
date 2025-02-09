import React, { createContext, useEffect, useMemo } from "react";
import * as SecureStore from 'expo-secure-store';

// --------------------------------
// Contexto de Auth
// --------------------------------
interface AuthContextValue {
    userToken: string | null;
    signIn: (token: string) => void;
    signOut: () => void;
    isLoading: boolean;
  }


  // Creamos el contexto
export const AuthContext = createContext<AuthContextValue>({
    userToken: null,
    signIn: () => {},
    signOut: () => {},
    isLoading: true,
  });



// Creamos el provider

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userToken, setUserToken] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    
    useEffect(() => {
        async function loadToken() {
            try {
                const storedAccessToken = await SecureStore.getItemAsync('userToken');
                if (storedAccessToken) {
                    setUserToken(storedAccessToken);
                }
            } catch (e) {
                console.error('Error loading token',e);
            } finally {
                setIsLoading(false);
            } 
          }
          loadToken();
        }, []);

  const signIn = (token: string) => {
    setUserToken(token);
    SecureStore.setItemAsync('userToken', token).catch(err => console.error('Error saving token', err));
  };

  const signOut = () => {
    setUserToken(null);
    SecureStore.deleteItemAsync('userToken').catch(err => console.error('Error deleting token', err));
  };

  const authContextValue = useMemo(
    () => ({
      userToken,
      signIn,
      signOut,
      isLoading,
    }),
    [userToken, isLoading]
  );

  if (isLoading) {
    return null;
  }

  return (
  <AuthContext.Provider value={authContextValue}>
    {children}
    </AuthContext.Provider>

);}

   
  