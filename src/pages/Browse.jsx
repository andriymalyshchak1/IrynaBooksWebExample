import { useState } from 'react';
import { filterBooksByDateRange } from '../data/mockBooks';
import { useBooks } from '../context/BooksContext';
import BookCard from '../components/BookCard';
import DateRangePicker from '../components/DateRangePicker';
import MessageModal from '../components/MessageModal';

export default function Browse() {
  const { allBooks } = useBooks();
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [messageBook, setMessageBook] = useState(null);

  const filtered = filterBooksByDateRange(allBooks, dateStart || null, dateEnd || null);

  return (
    <div className="browse">
      <div className="browse-filter">
        <p className="browse-filter-label">Filter by dates (book availability)</p>
        <DateRangePicker
          start={dateStart}
          end={dateEnd}
          onStartChange={setDateStart}
          onEndChange={setDateEnd}
        />
      </div>
      <div className="book-grid">
        {filtered.map((book) => (
          <BookCard key={book.id} book={book} onMessage={setMessageBook} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="browse-empty">No books available for the selected dates.</p>
      )}
      {messageBook && (
        <MessageModal book={messageBook} onClose={() => setMessageBook(null)} />
      )}
    </div>
  );
}
