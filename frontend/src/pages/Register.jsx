import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/apiClient';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      alert(res.data.message || 'Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 450 }}>
      <div className="card shadow-sm p-4">
        <h3 className="text-center text-primary mb-3">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="btn btn-primary w-100">Register</button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{' '}
            <a href="/login" className="text-decoration-none">Login</a>
          </small>
        </div>
      </div>
    </div>
  );
}
