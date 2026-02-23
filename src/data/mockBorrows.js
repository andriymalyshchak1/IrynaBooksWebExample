/**
 * Borrowals: { userId, bookId, fromDate, toDate }.
 * In a real app this would come from a backend; for MVP we use mock + localStorage.
 */
const BORROWS_KEY = 'dfw_book_rental_borrows';

function loadBorrows() {
  try {
    const raw = localStorage.getItem(BORROWS_KEY);
    if (!raw) return getDefaultBorrows();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : getDefaultBorrows();
  } catch {
    return getDefaultBorrows();
  }
}

function getDefaultBorrows() {
  return [
    { userId: 'u2', bookId: 'b1', fromDate: '2026-02-10', toDate: '2026-02-24' },
    { userId: 'u1', bookId: 'b2', fromDate: '2026-02-15', toDate: '2026-02-22' },
    { userId: 'u3', bookId: 'b3', fromDate: '2026-02-20', toDate: '2026-03-02' },
    { userId: 'u2', bookId: 'b5', fromDate: '2026-02-25', toDate: '2026-03-04' },
    { userId: 'u1', bookId: 'b4', fromDate: '2026-03-01', toDate: '2026-03-15' },
  ];
}

function saveBorrows(borrows) {
  try {
    localStorage.setItem(BORROWS_KEY, JSON.stringify(borrows));
  } catch (_) {}
}

export function getAllBorrows() {
  return loadBorrows();
}

export function getBorrowsForUser(userId) {
  return loadBorrows().filter((b) => b.userId === userId);
}

export function getBookIdsBorrowedByUser(userId) {
  return getBorrowsForUser(userId).map((b) => b.bookId);
}
