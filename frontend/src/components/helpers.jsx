import React from 'react';
import { Link } from 'gatsby';

// Typography
export const H1 = ({ children, className }) => <h1 className={`title ${className}`}>{children}</h1>;
export const H2 = ({ children, className }) => <h2 className={`subtitle ${className}`}>{children}</h2>;
export const Content = ({ children, className }) => <div className={`content ${className}`}>{children}</div>;

// Layout
export const Container = ({ children, className }) => (
  <div className={`container ${className}`}>{children}</div>
);
export const Section = ({ children, className }) => (
  <div className={`section ${className}`}>{children}</div>
);
export const Level = ({ children, className }) => (
  <div className={`level ${className}`}>{children}</div>
);
export const LevelLeft = ({ children, className }) => (
  <div className={`level-left ${className}`}>{children}</div>
);
export const LevelRight = ({ children, className }) => (
  <div className={`level-right ${className}`}>{children}</div>
);
export const LevelItem = ({ children, className }) => (
  <div className={`level-item ${className}`}>{children}</div>
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


export const Box = ({ children, className }) => (
  <div className={`box ${className}`}>{children}</div>
);