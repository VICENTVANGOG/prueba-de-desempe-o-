import { useEffect } from 'react';
import Cookies from 'js-cookie';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const checkAuthentication = () => {
      const token = Cookies.get('access_token');
      const nextAuthMessage = localStorage.getItem('nextauth.message');

      if (!token && !nextAuthMessage) {
        window.location.href = '/';
      }
    };

    checkAuthentication();
    const intervalId = setInterval(checkAuthentication, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return <>{children}</>;
};

export default ClientLayout;
