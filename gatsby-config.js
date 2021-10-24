const { author, description } = require("./package.json");

process.env.TZ = "Asia/Singapore";

module.exports = {
  pathPrefix: "/am-i-still-vaccinated",
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
        background_color: `#008080`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
  ],
};
