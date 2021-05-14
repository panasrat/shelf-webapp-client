import React, { createContext, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

import Header from '../components/Header';

import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const AuthRoute = ({ children, authenticated, logoutUser }) => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const FBIdToken = localStorage.FBIdToken;
    const checkAuthenticated = async () => {
      if (authenticated && FBIdToken) {
        setToken(FBIdToken);
        // Router.push('/');
      }
    };
    checkAuthenticated();
  }, []);

  if (!authenticated && !token && router.pathname !== '/login') {
    return (
      <>
        <Header />
        <div className='nav-offset-m'>
          <Modal isOpen={open} style={modalStyles}>
            <div className='d-flex flex-column align-items-center'>
              <picture>
                <img
                  className=''
                  alt='shelf'
                  src='/icons/logo-brown.svg'
                  style={{ width: '100px' }}
                />
              </picture>
              <div
                className='text-brown text-center'
                style={{ marginTop: '1rem' }}
              >
                You are not login yet. <br />
                Please Login <Link href='/login'>here</Link>
              </div>
            </div>
          </Modal>
        </div>
      </>
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
