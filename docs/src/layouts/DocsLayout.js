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
      <div className="relative md:ml-64 bg-blueGray-100">
        <AuthNavbar
          onClickMenuButton={() => {
            setMenuOpen(!menuOpen);
          }}
        />
        {/* Header */}

        <div className="pt-4 px-2 mx-auto w-full">{children}</div>
      </div>
    </>
  );
};
