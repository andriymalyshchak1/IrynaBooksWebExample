import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, isAdmin } = useAuth();

  return (
    <>
      <header className="layout-header">
        <Link to="/" className="layout-logo">DFW Book Rental</Link>
        <nav className="layout-nav">
          <Link to="/browse">Browse</Link>
          {user && <Link to="/add-book">List a book</Link>}
          {user && <Link to="/messages">Messages</Link>}
          {user ? (
            <Link to="/account">Account</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          {isAdmin && <Link to="/admin">Admin</Link>}
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </>
  );
}
