import '../styles/Global.css';
import { toast, Toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};