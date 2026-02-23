import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooks } from '../context/BooksContext';

const DFW_CITIES = [
  'Addison', 'Allen', 'Arlington', 'Bedford', 'Benbrook', 'Carrollton', 'Cedar Hill', 'Cleburne',
  'Colleyville', 'Coppell', 'Dallas', 'Decatur', 'DeSoto', 'Denton', 'Duncanville', 'Euless',
  'Farmers Branch', 'Flower Mound', 'Fort Worth', 'Frisco', 'Garland', 'Grand Prairie', 'Grapevine',
  'Haltom City', 'Highland Park', 'Hurst', 'Irving', 'Keller', 'Kennedale', 'Lancaster', 'Lewisville',
  'Mansfield', 'McKinney', 'Mesquite', 'Murphy', 'North Richland Hills', 'Plano', 'Richardson',
  'Rockwall', 'Rowlett', 'Sachse', 'Southlake', 'The Colony', 'University Park', 'Watauga',
  'Waxahachie', 'Weatherford', 'Wylie',
];

export default function AddBook() {
  const { user } = useAuth();
  const { addBook } = useBooks();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    coverImage: '',
    rentalPricePerMonth: '',
    maxRentalDays: '14',
    city: 'Dallas',
    availableFrom: '',
    availableTo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const price = parseFloat(form.rentalPricePerMonth);
    const days = parseInt(form.maxRentalDays, 10);
    if (!form.title.trim()) {
      setError('Please enter a book title.');
      return;
    }
    if (!form.shortDescription.trim()) {
      setError('Please enter a short description.');
      return;
    }
    if (Number.isNaN(price) || price < 0) {
      setError('Please enter a valid monthly price.');
      return;
    }
    if (Number.isNaN(days) || days < 1 || days > 365) {
      setError('Max rental days must be between 1 and 365.');
      return;
    }
    if (!form.availableFrom || !form.availableTo) {
      setError('Please set availability dates.');
      return;
    }
    if (new Date(form.availableTo) < new Date(form.availableFrom)) {
      setError('Available To must be after Available From.');
      return;
    }

    addBook({
      title: form.title.trim(),
      shortDescription: form.shortDescription.trim(),
      coverImage: form.coverImage.trim() || 'https://covers.openlibrary.org/b/isbn/9780385533228-M.jpg',
      rentalPricePerMonth: price,
      maxRentalDays: days,
      city: form.city,
      availableFrom: form.availableFrom,
      availableTo: form.availableTo,
      ownerId: user.id,
    });
    navigate('/browse', { replace: true });
  };

  if (!user) {
    return (
      <div className="add-book-page">
        <p>Log in to list a book.</p>
      </div>
    );
  }

  return (
    <div className="add-book-page">
      <h1>List a book from your collection</h1>
      <form className="add-book-form" onSubmit={handleSubmit}>
        <label>
          Book title *
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. The Great Gatsby"
            required
          />
        </label>
        <label>
          Short description *
          <textarea
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            placeholder="A brief summary or why you're lending it..."
            rows={3}
            required
          />
        </label>
        <label>
          Cover image URL
          <input
            name="coverImage"
            type="url"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://... (optional, default cover used if empty)"
          />
        </label>
        <label>
          Price per month ($) *
          <input
            name="rentalPricePerMonth"
            type="number"
            min="0"
            step="0.5"
            value={form.rentalPricePerMonth}
            onChange={handleChange}
            placeholder="e.g. 15"
            required
          />
        </label>
        <label>
          Max rental length (days) *
          <input
            name="maxRentalDays"
            type="number"
            min="1"
            max="365"
            value={form.maxRentalDays}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City *
          <select name="city" value={form.city} onChange={handleChange} required>
            {DFW_CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Available from *
          <input
            name="availableFrom"
            type="date"
            value={form.availableFrom}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Available to *
          <input
            name="availableTo"
            type="date"
            value={form.availableTo}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className="add-book-error">{error}</p>}
        <div className="add-book-actions">
          <button type="submit">List book</button>
          <button type="button" onClick={() => navigate('/browse')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
