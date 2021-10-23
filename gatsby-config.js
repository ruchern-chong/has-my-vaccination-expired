const { author, description } = require("./package.json")

module.exports = {
  siteMetadata: {
    title: `Am I Still Vaccinated?`,
    description: description,
    author: author,
    // siteUrl: ``,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `am-i-still-vaccinated`,
        short_name: `am-i-still-vaccinated`,
        start_url: `/`,
        background_color: `#1D4886`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
};
