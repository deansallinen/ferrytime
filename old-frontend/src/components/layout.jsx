import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDown, faAngleRight, faStar as faStarSolid, faCarSide, faTruck, faExclamationTriangle, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import { setConfig } from 'react-hot-loader';
import 'bulma/css/bulma.min.css';

import Header from './header';

setConfig({ pureSFC: true });

library.add(faAngleDown, faAngleRight, faStar, faStarSolid, faCarSide, faTruck, faExclamationTriangle, faArrowRight);
// import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Ferryti.me' },
            { name: 'keywords', content: 'BC, Ferry, Tracker, Time, Schedule' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        {children}
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
