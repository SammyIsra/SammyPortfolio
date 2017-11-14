import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";

//import "./index.css";

const FooterIconsContainer = styled.footer`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
`;

const FooterIconItem = styled.div`
  margin-left: 1rem;
`;

// const Header = () => (
//   <div
//     style={{
//       background: "rebeccapurple",
//       marginBottom: "1.45rem",
//     }}
//   >
//     <div
//       style={{
//         margin: "0 auto",
//         maxWidth: 960,
//         padding: "1.45rem 1.0875rem",
//       }}
//     >
//       <h1 style={{ margin: 0 }}>
//         <Link
//           to="/"
//           style={{
//             color: "white",
//             textDecoration: "none",
//           }}
//         >
//           Gatsby
//         </Link>
//       </h1>
//     </div>
//   </div>
// );

const Footer = () => 
  <div>
    Made proudly by Sammy
    <FooterIconsContainer>
      <FooterIconItem>Flickr</FooterIconItem>
      <FooterIconItem>Instagram</FooterIconItem>
      <FooterIconItem>Dev.to</FooterIconItem>
      <FooterIconItem>Github</FooterIconItem>
    </FooterIconsContainer>
  </div>;
  

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: "description", content: "Personal website and portfolio" },
        { name: "keywords", content: "sample, something" },
      ]}
    />
    {children()}
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;

export const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;