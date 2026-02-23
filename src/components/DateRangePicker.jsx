export default function DateRangePicker({ start, end, onStartChange, onEndChange }) {
  return (
    <div className="date-range-picker">
      <label className="date-range-label">
        <span>From</span>
        <input
          type="date"
          value={start}
          onChange={(e) => onStartChange(e.target.value)}
          aria-label="Start date"
        />
      </label>
      <label className="date-range-label">
        <span>To</span>
        <input
          type="date"
          value={end}
          onChange={(e) => onEndChange(e.target.value)}
          aria-label="End date"
        />
      </label>
    </div>
  );
}
