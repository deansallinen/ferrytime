module.exports = {
  siteMetadata: {
    title: 'Ferryti.me',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Ferryti.me',
        short_name: 'Ferrytime',
        start_url: '/',
        background_color: '#55abee',
        theme_color: '#007cbb',
        display: 'standalone',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: 'FTAPI',
        // This is the field under which it's accessible
        fieldName: 'ftapi',
        // URL to query from
        url: 'https://ferrytrackerserver.now.sh/graphql',
      },
    },
    'gatsby-plugin-offline',
  ],
};
