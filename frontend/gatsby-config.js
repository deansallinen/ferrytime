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
        legacy: true,
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
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-51101141-2',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'ferryti.me',
      },
    },
  ],
};
