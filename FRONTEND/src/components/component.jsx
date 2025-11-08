import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function RotaProtegida({ tipoPermitido, children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/Entrar" />;

  const user = jwtDecode(token);
  if (user.tipo !== tipoPermitido) return <Navigate to="/" />;

  return children;
}
