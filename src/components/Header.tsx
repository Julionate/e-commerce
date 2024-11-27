import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import darkMode from '../utils/DarkMode';
import IconSearch from '../assets/svg icons/IconSearch';
import IconShoppingCart from '../assets/svg icons/IconShoppingCart';
import IconSun from '../assets/svg icons/IconSun';
import IconMoonStars from '../assets/svg icons/IconMoonClearLine';
import IconHome from '../assets/svg icons/IconHome';

function Header({ onSearch, userData, isAuthenticated }) {
  const navigate = useNavigate();
  const currentLocation = useLocation().pathname;
  const [darkModeEnabled, setDarkMode] = useState(
    document.documentElement.classList.contains('dark'),
  );
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true, // Queremos observar cambios en los atributos
      attributeFilter: ['class'], // Sólo observar el atributo 'class'
    });

    return () => observer.disconnect();
  }, [darkModeEnabled]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e, key) => {
    if (e.key === key) {
      handleSubmit();
    }
  };

  return (
    <nav className="flex h-16 w-screen items-center justify-between px-4">
      <h1
        onClick={() => {
          navigate('/');
        }}
        className="cursor-pointer select-none text-base font-bold md:text-xl lg:text-2xl dark:text-white"
      >
        E-Commerce
      </h1>
      <div className="relative h-8 w-1/2 max-w-96 overflow-hidden rounded-md shadow-sm">
        <input
          onChange={handleInput}
          onKeyDown={(e) => handleKeyDown(e, 'Enter')}
          placeholder="Buscar productos..."
          type="text"
          className="h-8 w-full bg-slate-50 p-2 pr-10 placeholder:text-slate-400 dark:bg-slate-800 dark:text-white"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-0 top-0 h-full w-8 bg-sky-400 p-2 hover:bg-sky-500"
        >
          <IconSearch className="absolute inset-0 m-auto h-6 w-6 fill-white" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div
          onClick={() => navigate('/login')}
          className="ml-2 cursor-pointer select-none text-center font-semibold leading-4 shadow-sm"
        >
          {isAuthenticated ? (
            <>
              Hola, <span className="block">{userData.username}</span>
            </>
          ) : (
            <>
              <span>Iniciar</span>
              <span className="block">Sesión</span>
            </>
          )}
        </div>
        <button
          onClick={() =>
            currentLocation === '/cart' ? navigate('/') : navigate('/cart')
          }
          className="relative h-8 w-8 rounded-md bg-sky-400 shadow-sm hover:bg-sky-500"
        >
          {currentLocation === '/cart' ? (
            <IconHome className="absolute inset-0 m-auto h-6 w-6 fill-white" />
          ) : (
            <IconShoppingCart className="absolute inset-0 m-auto h-6 w-6 fill-white" />
          )}
        </button>
        <button
          onClick={darkMode}
          className="relative h-8 w-8 rounded-md bg-sky-400 shadow-sm hover:bg-sky-500"
        >
          {!document.documentElement.classList.contains('dark') ? (
            <IconSun className="absolute inset-0 m-auto h-6 w-6 fill-none stroke-white" />
          ) : (
            <IconMoonStars className="absolute inset-0 m-auto h-5 w-5 fill-white" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Header;
