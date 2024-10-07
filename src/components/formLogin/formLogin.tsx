import React, { useState, useEffect, useContext } from 'react'; 
import CustomForm from '@/components/ui/form/form';
import CustomInput from '@/components/ui/input/input';
import CustomLabel from '@/components/ui/label/label';
import './LoginForm.scss';
import CustomButton from '../ui/button/Button';
import Cookies from 'js-cookie'; 
import { LoginCredentials } from '@/interfaces/LoginCredentials'; 
import { I18nContext } from '@/app/I18nProvider';
import { signIn, useSession, signOut } from "next-auth/react";

interface LoginFormProps {
  onSwitchToRegister: () => void; 
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const i18nContext = useContext(I18nContext);
  
  if (!i18nContext) {
    throw new Error("I18nContext is not available");
  }

  const { t, changeLanguage } = i18nContext;

  const [credentials, setCredentials] = useState<LoginCredentials>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
      
      setIsLoggedIn(true); 
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/home';
    }
  }, [isLoggedIn]);

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="language-selector">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png" 
            alt="English" 
            onClick={() => changeLanguage('en')}
            className="flag-icon"
          />
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_Colombia.png" 
            alt="Español" 
            onClick={() => changeLanguage('es')}
            className="flag-icon"
          />
        </div>
        <div className="logo-container">
          <img 
            src="https://riwi.io/wp-content/uploads/2023/07/Fondo-claro-logo2-1.png" 
            alt="Riwi Logo" 
            className="logo" 
            width={200}
            height={100}
          />
        </div>
        
        <CustomForm title={t("login.title")} onSubmit={handleSubmit}>
          <p className="form-subtitle">{t("login.subtitle")}</p>
          
          <button
            onClick={() => signIn('google')}
            className="google-signin-button"
          >
            <img 
              src="" 
              alt="Sign in with Google" 
              className="google-logo"
            />
          </button>

          <CustomLabel text={t("login.username")} htmlFor="username" />
          <CustomInput
            type="text"
            id="username"
            name="username"
            placeholder={t("login.usernamePlaceholder")}
            value={credentials.username} 
            onChange={handleChange} 
          />
          
          <CustomLabel text={t("login.password")} htmlFor="password" />
          <CustomInput
            type="password"
            id="password"
            name="password"
            placeholder={t("login.passwordPlaceholder")}
            value={credentials.password} 
            onChange={handleChange} 
          />
          
          {error && <p className="error-message">{error}</p>}
          <CustomButton type="submit" className="sign-in-button" disabled={loading}>
            {loading ? t("login.loading") : t("login.submit")}
          </CustomButton>
          
          <p className="form-footer">
            {t("login.registerQuestion")} 
            <a href="#register" onClick={onSwitchToRegister}> {t("login.registerLink")}</a>
          </p>
        </CustomForm>
      </div>
      <div className="illustration-container">
        <div className="image-container">
          <img 
            src="https://riwi.io/wp-content/uploads/2024/09/P-Mesa-de-trabajo-4.png" 
            alt="Desarrollador" 
            className="dev-image" 
            width={800}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
