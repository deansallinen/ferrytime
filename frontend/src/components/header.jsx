import { Link, StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import { Container } from './helpers';

const Header = ({ siteTitle }) => (
  <StaticQuery
    query={graphql`
  query {
  logo: file(relativePath: {eq: "favicon.png"}) {
    childImageSharp {
      fixed(height: 28) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}
  `}
    render={
      data => (
        <nav
          className="navbar has-shadow"
          style={{ backgroundColor: '#55abee' }}
          role="navigation"
          aria-label="main navigation"
        >
          <Container>
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <Img fixed={data.logo.childImageSharp.fixed} style={{ marginRight: '.5rem' }} />
                <p className="is-size-6 is-uppercase has-text-dark has-text-weight-bold">
                  {siteTitle}
                </p>
              </Link>
            </div>
          </Container>
        </nav>
      )}
  />
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
