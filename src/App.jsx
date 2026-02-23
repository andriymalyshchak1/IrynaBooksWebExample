import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BooksProvider } from './context/BooksContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Landing from './pages/Landing';
import Browse from './pages/Browse';
import Login from './pages/Login';
import Account from './pages/Account';
import Messages from './pages/Messages';
import AddBook from './pages/AddBook';
import Admin from './pages/Admin';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BooksProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="browse" element={<Browse />} />
              <Route path="login" element={<Login />} />
              <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="add-book" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
              <Route path="admin" element={<AdminRoute><Admin /></AdminRoute>} />
            </Route>
          </Routes>
        </BooksProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
