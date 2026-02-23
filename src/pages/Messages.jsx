import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooks } from '../context/BooksContext';
import { getAllThreadsForUser } from '../data/mockMessages';
import { getUserById } from '../data/mockUsers';

export default function Messages() {
  const { user } = useAuth();
  const [selectedBook, setSelectedBook] = useState(null);

  if (!user) {
    return (
      <div className="messages-page">
        <h1>Messages</h1>
        <p className="messages-empty">Log in to view your messages.</p>
      </div>
    );
  }

  const { allBooks } = useBooks();
  const threads = getAllThreadsForUser(user.id);
  const bookIds = Array.from(threads.keys());

  const activeThread = selectedBook ? threads.get(selectedBook) ?? [] : [];
  const activeBookData = selectedBook ? allBooks.find((b) => b.id === selectedBook) : null;

  return (
    <div className="messages-page">
      <h1>Messages</h1>
      {bookIds.length === 0 ? (
        <p className="messages-empty">No conversations yet.</p>
      ) : (
        <div className="messages-layout">
          <aside className="messages-sidebar">
            {bookIds.map((bookId) => {
              const book = allBooks.find((b) => b.id === bookId);
              const msgs = threads.get(bookId);
              const lastMsg = msgs[msgs.length - 1];
              const otherUserId = lastMsg.fromUserId === user.id ? lastMsg.toUserId : lastMsg.fromUserId;
              const otherUser = getUserById(otherUserId);
              return (
                <button
                  key={bookId}
                  type="button"
                  className={`messages-thread-btn ${selectedBook === bookId ? 'active' : ''}`}
                  onClick={() => setSelectedBook(bookId)}
                >
                  <img src={book?.coverImage} alt="" className="messages-thread-cover" />
                  <div className="messages-thread-info">
                    <span className="messages-thread-title">{book?.title ?? 'Unknown'}</span>
                    <span className="messages-thread-with">with {otherUser?.displayName}</span>
                    <span className="messages-thread-preview">{lastMsg.text}</span>
                  </div>
                </button>
              );
            })}
          </aside>
          <section className="messages-detail">
            {!selectedBook ? (
              <p className="messages-detail-empty">Select a conversation</p>
            ) : (
              <>
                <div className="messages-detail-header">
                  <img src={activeBookData?.coverImage} alt="" className="messages-detail-cover" />
                  <h2>{activeBookData?.title}</h2>
                </div>
                <div className="messages-detail-thread">
                  {activeThread.map((m) => {
                    const isMe = m.fromUserId === user.id;
                    const sender = getUserById(m.fromUserId);
                    return (
                      <div key={m.id} className={`message-bubble ${isMe ? 'message-bubble-me' : ''}`}>
                        {!isMe && <span className="message-sender">{sender?.displayName}</span>}
                        <p className="message-text">{m.text}</p>
                        <span className="message-time">
                          {new Date(m.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
