module.exports = {
  siteMetadata: {
    title: 'Ferrytracker',
  },
  plugins: ['gatsby-plugin-react-helmet'],
  proxy: {
    prefix: '/api',
    url: 'http://localhost:8080',
  },
}
