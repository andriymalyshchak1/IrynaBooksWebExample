const BANNED_KEY = 'dfw_book_rental_banned_ids';
const USER_ADDED_KEY = 'dfw_book_rental_user_added_users';

export const mockUsers = [
  { id: 'u1', displayName: 'Jordan Lee' },
  { id: 'u2', displayName: 'Sam Chen' },
  { id: 'u3', displayName: 'Alex Rivera' },
];

export function getBannedIds() {
  try {
    const raw = localStorage.getItem(BANNED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setBannedIds(ids) {
  try {
    localStorage.setItem(BANNED_KEY, JSON.stringify(ids));
  } catch (_) {}
}

export function loadUserAddedUsers() {
  try {
    const raw = localStorage.getItem(USER_ADDED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUserAddedUsers(users) {
  try {
    localStorage.setItem(USER_ADDED_KEY, JSON.stringify(users));
  } catch (_) {}
}

export function getAllUsers() {
  return [...mockUsers, ...loadUserAddedUsers()];
}

export function getUserById(id) {
  return getAllUsers().find((u) => u.id === id) ?? null;
}

export function addUserToStorage(displayName) {
  const users = loadUserAddedUsers();
  const id = `u${Date.now()}`;
  users.push({ id, displayName });
  saveUserAddedUsers(users);
  return id;
}

export function banUserInStorage(userId) {
  const ids = getBannedIds();
  if (ids.includes(userId)) return;
  setBannedIds([...ids, userId]);
}

export function unbanUserInStorage(userId) {
  setBannedIds(getBannedIds().filter((id) => id !== userId));
}
