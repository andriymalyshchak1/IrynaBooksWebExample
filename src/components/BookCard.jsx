export default function BookCard({ book, onMessage }) {
  return (
    <article className="book-card">
      <div className="book-card-cover-wrap">
        <img
          src={book.coverImage}
          alt={`Cover: ${book.title}`}
          className="book-card-cover"
        />
      </div>
      <div className="book-card-body">
        <h2 className="book-card-title">{book.title}</h2>
        <p className="book-card-desc">{book.shortDescription}</p>
        <p className="book-card-price">${book.rentalPricePerMonth}/month</p>
        <p className="book-card-meta">{book.city}</p>
        <p className="book-card-meta">Up to {book.maxRentalDays} days</p>
        <button type="button" className="book-card-message" onClick={() => onMessage?.(book)}>
          Message
        </button>
      </div>
    </article>
  );
}
