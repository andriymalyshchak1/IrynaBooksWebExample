import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllUsers } from '../data/mockUsers';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [demoUserId, setDemoUserId] = useState('u1');

  const allUsers = getAllUsers();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.');
      return;
    }
    const selectedUser = allUsers.find((u) => u.id === demoUserId) ?? allUsers[0];
    const success = login(selectedUser);
    if (!success) {
      setError('This account has been suspended for violating the rules of use.');
      return;
    }
    navigate('/browse', { replace: true });
  };

  return (
    <div className="login-page">
      <h1>Log in</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </label>
        <label>
          Log in as (demo)
          <select value={demoUserId} onChange={(e) => setDemoUserId(e.target.value)}>
            {allUsers.map((u) => (
              <option key={u.id} value={u.id}>{u.displayName}</option>
            ))}
          </select>
        </label>
        {error && <p className="login-error">{error}</p>}
        <button type="submit">Log in</button>
      </form>
      <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Demo: any email and password; choose user above to test.
      </p>
    </div>
  );
}
