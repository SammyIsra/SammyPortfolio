module.exports = {
  siteMetadata: {
    title: "Sammy's Website",
    description: " ☄️Sammy's website and portfolio!\nFrom Development to Photography",
    tags: ["portfolio", "software developer", "developer", "photographer"]
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.js",
      },
    },
  ],
};
