import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import { useEffect, useState } from 'react';
import Product from './pages/Product';
import useAuth from './utils/useAuth';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [userData, setUserData] = useState({});
  const isAuthenticated = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded);
    }

    if (isAuthenticated === false) {
      localStorage.removeItem('token');
    }
  }, [isAuthenticated]);

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const [submitInput, setSubmitInput] = useState('');

  const handleSubmitInput = (value: string) => {
    setSubmitInput(value);
  };

  return (
    <div className="min-w-screen flex min-h-screen flex-col bg-white text-gray-800 dark:bg-slate-900 dark:text-white">
      <Router>
        <Header
          onSearch={handleSubmitInput}
          userData={userData}
          isAuthenticated={isAuthenticated}
        />
        <Routes>
          <Route path="/" element={<Home submitInput={submitInput} />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
