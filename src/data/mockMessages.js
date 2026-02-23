export const mockMessages = [
  { id: 'm1', bookId: 'b1', fromUserId: 'u1', toUserId: 'u2', text: 'Is The Great Gatsby still available next week?', createdAt: '2026-02-18T10:00:00Z' },
  { id: 'm2', bookId: 'b1', fromUserId: 'u2', toUserId: 'u1', text: 'Yes! You can pick it up Monday.', createdAt: '2026-02-18T11:30:00Z' },
  { id: 'm3', bookId: 'b1', fromUserId: 'u1', toUserId: 'u2', text: 'Great, see you then!', createdAt: '2026-02-18T12:00:00Z' },
  { id: 'm4', bookId: 'b2', fromUserId: 'u3', toUserId: 'u1', text: 'Interested in renting Crawdads for 5 days.', createdAt: '2026-02-19T09:00:00Z' },
  { id: 'm5', bookId: 'b2', fromUserId: 'u1', toUserId: 'u3', text: 'Sure thing, where should we meet?', createdAt: '2026-02-19T09:45:00Z' },
  { id: 'm6', bookId: 'b5', fromUserId: 'u1', toUserId: 'u2', text: 'Hey, is Educated available this month?', createdAt: '2026-02-20T14:00:00Z' },
  { id: 'm7', bookId: 'b5', fromUserId: 'u2', toUserId: 'u1', text: 'It is! I can drop it off or meet halfway.', createdAt: '2026-02-20T15:00:00Z' },
  { id: 'm8', bookId: 'b7', fromUserId: 'u1', toUserId: 'u3', text: 'Can I rent Dune starting March 5?', createdAt: '2026-02-21T08:00:00Z' },
  { id: 'm9', bookId: 'b10', fromUserId: 'u2', toUserId: 'u1', text: 'Would love to borrow 1984, is 10 days ok?', createdAt: '2026-02-21T10:00:00Z' },
  { id: 'm10', bookId: 'b10', fromUserId: 'u1', toUserId: 'u2', text: 'Absolutely, it\'s all yours.', createdAt: '2026-02-21T10:30:00Z' },
];

export function getMessagesForBook(bookId, currentUserId) {
  return mockMessages
    .filter((m) => m.bookId === bookId && (m.fromUserId === currentUserId || m.toUserId === currentUserId))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

export function getAllThreadsForUser(currentUserId) {
  const userMessages = mockMessages.filter(
    (m) => m.fromUserId === currentUserId || m.toUserId === currentUserId
  );
  const threads = new Map();
  for (const m of userMessages) {
    if (!threads.has(m.bookId)) threads.set(m.bookId, []);
    threads.get(m.bookId).push(m);
  }
  for (const [, msgs] of threads) {
    msgs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  return threads;
}
