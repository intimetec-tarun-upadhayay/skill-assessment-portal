import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials', error);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
