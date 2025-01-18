// app/auth/AuthFlowContext.tsx
import React, { createContext, useContext, useState } from 'react';

type AuthFlowContextType = {
  lastRegisteredEmail: string | null;
  setLastRegisteredEmail: (email: string | null) => void;
};

const AuthFlowContext = createContext<AuthFlowContextType>({
  lastRegisteredEmail: null,
  setLastRegisteredEmail: () => {},
});

export function AuthFlowProvider({ children }: { children: React.ReactNode }) {
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState<string | null>(null);

  return (
    <AuthFlowContext.Provider value={{ lastRegisteredEmail, setLastRegisteredEmail }}>
      {children}
    </AuthFlowContext.Provider>
  );
}

// Hook auxiliar para consumirlo
export function useAuthFlow() {
  return useContext(AuthFlowContext);
}
