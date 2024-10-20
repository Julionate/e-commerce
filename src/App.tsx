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
import { useState } from 'react';
import Product from './pages/Product';

function App() {
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
        <Header onSearch={handleSubmitInput} />
        <Routes>
          <Route path="/" element={<Home submitInput={submitInput} />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
