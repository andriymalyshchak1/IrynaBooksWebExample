import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooks } from '../context/BooksContext';
import {
  getAllUsers,
  getBannedIds,
  addUserToStorage,
  banUserInStorage,
  unbanUserInStorage,
} from '../data/mockUsers';
import { getBorrowsForUser } from '../data/mockBorrows';

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const { allBooks } = useBooks();
  const [users, setUsers] = useState([]);
  const [bannedIds, setBannedIds] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [message, setMessage] = useState('');

  const getBooksListedByUser = (userId) =>
    allBooks.filter((b) => b.ownerId === userId).map((b) => b.title);

  const getBooksBorrowedByUser = (userId) => {
    const borrows = getBorrowsForUser(userId);
    return borrows
      .map((b) => allBooks.find((book) => book.id === b.bookId)?.title)
      .filter(Boolean);
  };

  const refresh = () => {
    setUsers(getAllUsers());
    setBannedIds(getBannedIds());
  };

  useEffect(() => {
    refresh();
  }, []);

  if (!user) {
    return (
      <div className="admin-page">
        <p>Log in to access this page.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-page">
        <p>You do not have permission to access the admin area.</p>
      </div>
    );
  }

  const handleAddUser = (e) => {
    e.preventDefault();
    setMessage('');
    const name = newDisplayName.trim();
    if (!name) {
      setMessage('Please enter a display name.');
      return;
    }
    addUserToStorage(name);
    setNewDisplayName('');
    setMessage(`Added user "${name}".`);
    refresh();
  };

  const handleBan = (userId) => {
    if (userId === user.id) {
      setMessage('You cannot ban your own account.');
      return;
    }
    banUserInStorage(userId);
    setMessage('User suspended. They will not be able to log in.');
    refresh();
  };

  const handleUnban = (userId) => {
    unbanUserInStorage(userId);
    setMessage('User reinstated. They can log in again.');
    refresh();
  };

  return (
    <div className="admin-page">
      <h1>Admin – User management</h1>
      <p className="admin-intro">
        Add users or suspend access when rules of use are violated.
      </p>

      <section className="admin-section">
        <h2>Add user</h2>
        <form className="admin-add-form" onSubmit={handleAddUser}>
          <input
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            placeholder="Display name"
            aria-label="New user display name"
          />
          <button type="submit">Add user</button>
        </form>
      </section>

      <section className="admin-section">
        <h2>Users</h2>
        {message && <p className="admin-message">{message}</p>}
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Status</th>
              <th>Books listed</th>
              <th>Books borrowed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const banned = bannedIds.includes(u.id);
              const isSelf = u.id === user.id;
              const listed = getBooksListedByUser(u.id);
              const borrowed = getBooksBorrowedByUser(u.id);
              return (
                <tr key={u.id}>
                  <td>{u.displayName}</td>
                  <td><code className="admin-id">{u.id}</code></td>
                  <td>{banned ? <span className="admin-banned">Suspended</span> : 'Active'}</td>
                  <td className="admin-books-cell">
                    {listed.length === 0 ? (
                      <span className="admin-books-empty">—</span>
                    ) : (
                      <ul className="admin-books-list">
                        {listed.map((title) => (
                          <li key={title}>{title}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="admin-books-cell">
                    {borrowed.length === 0 ? (
                      <span className="admin-books-empty">—</span>
                    ) : (
                      <ul className="admin-books-list">
                        {borrowed.map((title) => (
                          <li key={title}>{title}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>
                    {banned ? (
                      <button type="button" className="admin-btn admin-btn-unban" onClick={() => handleUnban(u.id)}>
                        Reinstate
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="admin-btn admin-btn-ban"
                        onClick={() => handleBan(u.id)}
                        disabled={isSelf}
                        title={isSelf ? 'Cannot ban yourself' : 'Suspend this user'}
                      >
                        Suspend
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
