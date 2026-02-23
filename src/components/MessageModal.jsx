import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMessagesForBook } from '../data/mockMessages';
import { getUserById } from '../data/mockUsers';

export default function MessageModal({ book, onClose }) {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [localMessages, setLocalMessages] = useState([]);

  const initialMessages = useMemo(
    () => (user ? getMessagesForBook(book.id, user.id) : []),
    [book.id, user]
  );
  const allMessages = [...initialMessages, ...localMessages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const handleSend = () => {
    const text = input.trim();
    if (!text || !user) return;
    setLocalMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        bookId: book.id,
        fromUserId: user.id,
        toUserId: book.ownerId,
        text,
        createdAt: new Date().toISOString(),
      },
    ]);
    setInput('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Message thread">
      <div className="modal-content message-modal" onClick={(e) => e.stopPropagation()}>
        <div className="message-modal-header">
          <h2 className="message-modal-title">{book.title}</h2>
          <button type="button" className="message-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="message-modal-thread">
          {allMessages.length === 0 && (
            <p className="message-modal-empty">No messages yet. Say hi!</p>
          )}
          {allMessages.map((m) => {
            const isMe = m.fromUserId === user?.id;
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
        {user ? (
          <div className="message-modal-input-wrap">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="message-modal-input"
              aria-label="Message input"
            />
            <button type="button" onClick={handleSend} className="message-modal-send">
              Send
            </button>
          </div>
        ) : (
          <p className="message-modal-login">Log in to message the owner.</p>
        )}
      </div>
    </div>
  );
}
