import React, { createContext, useState, useContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Router, { useRouter } from 'next/router';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //   const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const setAuthTrue = () => setAuthenticated(true);

  useEffect(() => {
    async function checkTokenInLocalStorage() {
      const token = localStorage.FBIdToken;
      if (token) {
        console.log('Got a token in the local storage');
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log('Token expired');
          Router.push('/login');
        }
        setAuthenticated(true);
      } else {
        console.log('No token yet');
        Router.push('/login');
      }
    }
    checkTokenInLocalStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: authenticated, setAuthTrue }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  console.log('auth', isAuthenticated);
  if (
    !isAuthenticated &&
    router.pathname !== '/login' &&
    router.pathname !== '/signup'
  ) {
    return <h1>Loading</h1>;
  }
  return children;
};
