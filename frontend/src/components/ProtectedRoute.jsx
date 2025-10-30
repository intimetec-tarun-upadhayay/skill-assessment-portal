import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  const storedUser = !user ? JSON.parse(localStorage.getItem('user')) : null;
  const activeUser = user || storedUser;
  
  if (!activeUser) return <Navigate to="/login" replace />;

  if (role && activeUser.role !== role) return <Navigate to="/dashboard" replace />;

  return children;
}
