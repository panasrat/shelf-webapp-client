import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, ProtectRoute } from '../util/auth';

const MyApp = ({ Component, pageProps }) => (
  <AuthProvider>
    <ProtectRoute>
      <Component {...pageProps} />
    </ProtectRoute>
  </AuthProvider>
);

export default MyApp;
