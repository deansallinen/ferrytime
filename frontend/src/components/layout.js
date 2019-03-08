import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';

function Layout({ children, route_name }) {
  return (
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
        <div className="flex flex-col font-sans min-h-screen text-grey-darkest bg-blue">
          <Header
            siteTitle={data.site.siteMetadata.title}
            route_name={route_name}
          />

          <div className="flex flex-col flex-1  max-w-xl mx-auto px-3 py-8 md:p-8 w-full ">
            {children}
          </div>

          <footer className="bg-blue antialiased">
            <div className="flex justify-between max-w-xl mx-auto p-4 md:p-8 text-sm">
              <p className="text-white">
                Created by{' '}
                <a
                  href="https://www.deansallinen.ca"
                  className="font-bold no-underline text-white"
                >
                  Dean Sallinen
                </a>
              </p>

              <p>
                <a
                  href="https://github.com/deansallinen/ferrytime"
                  className="font-bold no-underline text-white"
                >
                  GitHub
                </a>
              </p>
            </div>
          </footer>
        </div>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
