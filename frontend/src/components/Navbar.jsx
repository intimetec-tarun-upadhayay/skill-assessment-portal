import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/">
        Skill Portal
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">
        {user ? (
          <>
            <span className="text-white small">
              {user.email}
            </span>
            <button className="btn btn-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-light btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
