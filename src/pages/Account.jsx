import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  if (!user) {
    return (
      <div className="account-page">
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="account-page">
      <h1>Account</h1>
      <p>Logged in as <strong>{user.displayName}</strong></p>
      <p>
        <Link to="/add-book" className="account-link">List a book from your collection</Link>
      </p>
      <button type="button" onClick={handleLogout}>Log out</button>
    </div>
  );
}
