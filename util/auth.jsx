import React, { createContext, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

export const AuthRoute = ({ children, authenticated, logoutUser }) => {
  const router = useRouter();
  const [token, setToken] = useState('');
  console.log('here 1');

  useEffect(() => {
    const FBIdToken = localStorage.FBIdToken;
    const checkAuthenticated = async () => {
      console.log('here 2');
      if (authenticated && FBIdToken) {
        setToken(FBIdToken);
        Router.push('/');
      } else {
        logoutUser();
        Router.push('/login');
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
    console.log('here 3');
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
