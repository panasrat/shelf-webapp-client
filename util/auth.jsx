import React, { createContext, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

export const AuthRoute = ({ children, authenticated, logoutUser }) => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const FBIdToken = localStorage.FBIdToken;
    const checkAuthenticated = async () => {
      if (authenticated && FBIdToken) {
        setToken(FBIdToken);
        Router.push('/');
      }
    };
    checkAuthenticated();
  }, []);

  if (
    !authenticated &&
    !token &&
    router.pathname !== '/login' &&
    router.pathname !== '/signup'
  ) {
    return (
      <h1>
        You are not login yet. Please Login <Link href='/login'>here</Link>
      </h1>
    );
  }

  return children;
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

const mapActionToProps = {
  logoutUser,
};

export const AuthRouteRedux = connect(
  mapStateToProps,
  mapActionToProps
)(AuthRoute);
