import React from 'react';
import { Link } from 'gatsby';

// Typography
export const H1 = ({ children }) => <h1 className="title">{children}</h1>;
export const H2 = ({ children }) => <h2 className="subtitle">{children}</h2>;

// Layout
export const Container = ({ children, className }) => (
  <div className={`container ${className}`}>{children}</div>
);
export const Section = ({ children, className }) => (
  <div className={`section ${className}`}>{children}</div>
);

// Tiles
export const Tile = ({ children, className }) => (
  <div className={`tile  ${className}`}>{children}</div>
);
export const Ancestor = ({ children, className }) => (
  <div className={`tile is-ancestor ${className}`}>{children}</div>
);
export const Parent = ({ children, className }) => (
  <div className={`tile  is-parent ${className}`}>{children}</div>
);
export const Child = ({ children, className }) => (
  <div className={` tile is-child ${className}`}>{children}</div>
);

// Columns
export const Columns = ({ children, className }) => (
  <div className={`columns ${className}`}>{children}</div>
);
export const Column = ({ children, className }) => (
  <div className={`column ${className}`}>{children}</div>
);

// Button
export const Button = ({ children, className, to }) => (
  <Link to={to}>
    <button className={`button is-large ${className}`}>{children}</button>
  </Link>
);
