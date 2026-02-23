import { Link } from 'react-router-dom';

/* To match the reference image exactly: use PNG/SVG assets for the “popping” shapes.
   Place files in public/ (e.g. shape-spiky.png, shape-blob.png, shape-fold.png) and
   replace the .landing-shape-metal divs with <img src="/shape-*.png" alt="" /> and
   position with the same classes. PNGs with transparency work best. */

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-shapes landing-shapes-behind" aria-hidden>
        <div className="landing-shape landing-shape-blob landing-shape-1" />
        <div className="landing-shape landing-shape-blob landing-shape-2" />
        <div className="landing-shape landing-shape-blob landing-shape-3" />
      </div>
      <section className="landing-hero">
        <h1 className="landing-headline">
          <span className="landing-headline-line">Hi, we're DFW Book Rental,</span>
          <span className="landing-headline-line">and we help you</span>
          <span className="landing-headline-line">borrow books from neighbors.</span>
        </h1>
        <p className="landing-subline">
          Short-term physical rentals across Dallas–Fort Worth.
        </p>
        <Link to="/browse" className="landing-cta">Find books</Link>
      </section>
      <div className="landing-shapes landing-shapes-front" aria-hidden>
        <div className="landing-shape landing-shape-metal landing-shape-spiky" />
        <div className="landing-shape landing-shape-metal landing-shape-pebble" />
        <div className="landing-shape landing-shape-metal landing-shape-fold" />
      </div>
      <footer className="landing-footer">
        DFW only · Physical rentals
      </footer>
    </div>
  );
}
