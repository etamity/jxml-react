import React, { useState } from 'react';
import { useAppContext } from '../core';

// components

import AuthNavbar from '../components/Navbars/AuthNavbar.js';
import Navigation from '../components/Sidebar/Navigation.js';

export default ({ children }) => {
  const { routes } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <>
      {menuOpen && <Navigation routes={routes} />}
      <div
        className={`transition-all duration-150 relative ${
          menuOpen ? 'ml-64 ease-in-in' : 'ml-0 ease-in-out'
        }`}
      >
        <AuthNavbar
          onClickMenuButton={() => {
            setMenuOpen(!menuOpen);
          }}
        />
        {/* Header */}
        <div className="p-4 mx-auto w-full">{children}</div>
      </div>
    </>
  );
};
