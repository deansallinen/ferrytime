import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Container } from './helpers';
// import { useTime } from './time-context';
// import { format } from 'date-fns';

// const Clock = () => {
//   const time = useTime()
//   return <div>{format(time, "HH:mm:ss")}</div>
// }

const Header = ({ siteTitle }) => (
  <nav
    className="navbar has-shadow"
    style={{ backgroundColor: '#55abee' }}
    role="navigation"
    aria-label="main navigation"
  >
    <Container>
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <Brand siteTitle={siteTitle}/>
        </Link>
      </div>
    </Container>
  </nav>

);

export default Header;
