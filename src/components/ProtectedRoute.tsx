import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    // Si el usuario no está autenticado, lo redirige a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si está autenticado, muestra el contenido de la ruta protegida
  return children;
}

export default ProtectedRoute;
