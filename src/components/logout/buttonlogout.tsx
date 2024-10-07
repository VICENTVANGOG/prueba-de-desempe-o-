import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import './LogoutButton.scss';
import { I18nContext } from '@/app/I18nProvider';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const i18n = useContext(I18nContext);

  if (!i18n) {
    return null; 
  }

  const { t } = i18n;

  const handleLogout = () => {
    Cookies.remove('access_token'); 
    Cookies.remove('nextauth.message'); 
    localStorage.clear(); 
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      {t('logout')}
    </button>
  );
};

export default LogoutButton;
