import React from 'react';

export const Card = ({ children, ...props }) => <span {...props}> {children} </span>;
export const Header = ({ children, ...props }) => <header {...props}> {children}</header>;
export const Div = ({ children, ...props }) => <div {...props}> {children}</div>;
export const Button = ({ children, ...props }) => <button {...props}> {children}</button>;
export const Section = ({ children, ...props }) => <section {...props}>{children} </section>;
export const GreenButton = ({ name, ...props }) => (
  <button style={{ backgroundColor: 'green' }} {...props}>
    {name}
  </button>
);
