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
      {menuOpen && <Navigation routes={routes} className={``} />}
      <div
        className={`transition-all duration-150 relative bg-gray-100 ${
          menuOpen ? 'ml-64 ease-in-in' : 'ml-0 ease-in-out'
        }`}
      >
        <AuthNavbar
          onClickMenuButton={() => {
            setMenuOpen(!menuOpen);
          }}
        />
        <div className="pt-4 px-2 mx-auto w-full bg-white">{children}</div>
      </div>
    </>
  );
};
