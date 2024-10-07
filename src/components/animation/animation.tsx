import React, { useState } from 'react';
import LoginForm from '@/components/formLogin/formLogin';
import RegisterForm from '@/components/formRegister/formRegister';
import './Auth.scss';

const Auth: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleSwitchToRegister = () => {
    setIsRegister(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegister(false);
  };

  return (
    <div className={`auth-container ${isRegister ? 'register' : 'login'}`}>
      {isRegister ? (
        <>
          <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
        </>
      ) : (
        <>
          <LoginForm onSwitchToRegister={handleSwitchToRegister} />
        </>
      )}
    </div>
  );
};

export default Auth;
