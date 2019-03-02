import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';



const Brand = ({ siteTitle }) => (
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
        <>
          <Img fixed={data.logo.childImageSharp.fixed} style={{ marginRight: '.5rem' }} />
          <p className="is-size-6 is-uppercase has-text-weight-bold">
            {siteTitle}
          </p>
        </>
      )}
  />
);

Brand.propTypes = {
  siteTitle: PropTypes.string,
};

Brand.defaultProps = {
  siteTitle: '',
};

export default Brand;