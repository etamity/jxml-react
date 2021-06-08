import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavLinkAdapter = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));
