import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface AuthContextProps {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const expirationTime = getTokenExpirationTime(savedToken);
      if (Date.now() >= expirationTime) {
        logout();
      } else {
        setToken(savedToken);
        const timeout = expirationTime - Date.now();
        setTimeout(() => {
          logout();
        }, timeout);
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
    router.push('/dashboard');
    const expirationTime = getTokenExpirationTime(token);
    const timeout = expirationTime - Date.now();
    setTimeout(() => {
      logout();
    }, timeout);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    router.push('/login');
  };


  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const getTokenExpirationTime = (token: string): number => {
  const payloadBase64 = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payloadBase64));
  return decodedPayload.exp * 1000;
};

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
