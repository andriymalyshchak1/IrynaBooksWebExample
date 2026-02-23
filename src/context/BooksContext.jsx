import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { mockBooks } from '../data/mockBooks';

const STORAGE_KEY = 'dfw_book_rental_user_books';

const BooksContext = createContext(null);

function loadUserBooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUserBooks(books) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (_) {}
}

export function BooksProvider({ children }) {
  const [userBooks, setUserBooks] = useState(loadUserBooks);

  const addBook = useCallback((book) => {
    const id = `user-${Date.now()}`;
    const newBook = { ...book, id };
    setUserBooks((prev) => {
      const next = [...prev, newBook];
      saveUserBooks(next);
      return next;
    });
    return id;
  }, []);

  const allBooks = [...mockBooks, ...userBooks];

  return (
    <BooksContext.Provider value={{ allBooks, userBooks, addBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error('useBooks must be used within BooksProvider');
  return ctx;
}
