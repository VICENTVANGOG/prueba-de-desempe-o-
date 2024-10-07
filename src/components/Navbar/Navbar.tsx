import React, { useContext, useState } from 'react';
import { I18nContext } from '@/app/I18nProvider'; 
import LogoutButton from '@/components/logout/buttonlogout';
import { FaBars } from 'react-icons/fa'; 
import './Navbar.scss';

interface NavbarProps {
  onLogout: () => void;
  onSelectCategory: (category: string) => void; 
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, onSelectCategory }) => {
  const i18n = useContext(I18nContext); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!i18n) {
    return null; 
  }

  const { t, changeLanguage } = i18n;

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
      <div className="navbar-content">
        <div className="navbar-logo">
          <img
            src="https://riwi.io/wp-content/uploads/2023/07/Fondo-claro-logo2-1-1536x433.png"
            alt="Riwi Logo"
            width={100}
            height={40}
          />
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <FaBars />
        </div>
        <div className={`navbar-items ${isMenuOpen ? 'show' : ''}`}>
          <NavItem title={t('products.all_products')} onClick={() => onSelectCategory("all products")} />
          <NavItem title={t('products.gifts')} onClick={() => onSelectCategory("men's clothing")} />
          <NavItem title={t('products.coders')} onClick={() => onSelectCategory("electronics")} />
          <NavItem title={t('products.clothing')} onClick={() => onSelectCategory("women's clothing")} />
          <LogoutButton onLogout={onLogout} />
          <div className="language-switcher">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_Colombia.png"
              alt="Colombia"
              onClick={() => handleLanguageChange('es')}
              style={{ cursor: 'pointer', width: 30, height: 20, margin: '0 5px' }}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/800px-Flag_of_the_United_States.png"
              alt="USA"
              onClick={() => handleLanguageChange('en')}
              style={{ cursor: 'pointer', width: 30, height: 20, margin: '0 5px' }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ title: string; onClick: () => void }> = ({ title, onClick }) => (
  <div className="nav-item" onClick={onClick}>
    <span>{title}</span>
  </div>
);

export default Navbar;
