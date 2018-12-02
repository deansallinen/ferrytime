module.exports = {
  siteMetadata: {
    title: 'Ferryti.me',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#4fc3f7',
        theme_color: '#0093c4',
        display: 'minimal-ui',
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
}
