'use client';

/**
 * Page transition template — pure CSS fade-in.
 * Replaces Framer Motion wrapper that was applying a brightness filter
 * on every page load, causing the browser to composite the entire page
 * through a GPU filter pipeline during the transition.
 */
export default function Template({ children }) {
  return (
    <div className="page-enter">
      {children}
    </div>
  );
}
