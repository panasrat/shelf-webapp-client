import React, { createContext, useState, useContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

export const AuthRoute = ({ children, authenticated }) => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const FBIdToken = localStorage.FBIdToken;
    const checkAuthenticated = async () => {
      if (authenticated || FBIdToken) {
        setToken(FBIdToken);
        Router.push('/');
      } else {
        Router.push('/login');
      }
    };
    checkAuthenticated();
  }, []);

  console.log('auth', authenticated);

  if (
    !authenticated &&
    !token &&
    router.pathname !== '/login' &&
    router.pathname !== '/signup'
  ) {
    return <h1>Loading</h1>;
  }

  return children;
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export const AuthRouteRedux = connect(mapStateToProps)(AuthRoute);
