// NavBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const linkClass = (path) =>
    location.pathname === path
      ? 'text-white font-bold underline'
      : 'text-gray-300 hover:text-white';

  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      <h1 className="text-white text-xl">📝 My Notes App</h1>
      <div className="flex gap-4">
        <Link to="/" className={linkClass('/')}>Notes</Link>
        {/* <Link to="/editor" className={linkClass('/editor')}>Editor</Link> */}
        <Link to="/glossary" className={linkClass('/glossary')}>Glossary</Link>
        {/* <Link to="/editor" className={linkClass('/editor')}>Editor</Link> */}

      </div>
    </nav>
  );
}

export default NavBar;