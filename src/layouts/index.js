import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";

import Header from "../components/Header";
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

const FooterContainer = styled.div`
  background-color: ${props => props.dark ? "rgb(51,51,51)" : "white" };
  color: ${props => props.dark? "white" : "inherit"};
  padding: 1.5rem;
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


// SAMMY:
//  Implement dark theme in footer
//  Maybe also take in "accent color" as props?
//  Or always use one color? Like WesBos yellow?

const Footer = ({dark}) => 
  <FooterContainer dark={dark}>
    Made proudly by Sammy: Finding your lack of sense of pride and accomplisment, disturbing.
    <FooterIconsContainer>
      <FooterIconItem><a href="https://twitter.com/SammyIs_Me">Twitter</a></FooterIconItem>      
      <FooterIconItem><a href="https://www.flickr.com/photos/sammy_iy/">Flickr</a></FooterIconItem>
      <FooterIconItem><a href="https://www.linkedin.com/in/sammyisrawi/">LinkedIn</a></FooterIconItem>
      <FooterIconItem><a href="https://dev.to/sammyisa">Dev.to</a></FooterIconItem>
      <FooterIconItem><a href="https://github.com/SammyIsra">Github</a></FooterIconItem>
    </FooterIconsContainer>
  </FooterContainer>;
  

class TemplateWrapper extends React.Component {
  
  componentWillMount(){
    this.setTheme(this.props.location.pathname);
  }

  componentWillReceiveProps(newProps){
    this.setTheme(newProps.location.pathname);
  }

  setTheme = (path) => {

    //Find the path and set the theme to dark or light
    if(path === "/photographer"){
      this.setState({useDarkTheme: true});
    } else if(path === "/developer") {
      this.setState({useDarkTheme: false});      
    } else {
      this.setState({useDarkTheme: false});
    }
  }

  render(){

    const { 
      children, 
      data 
    } = this.props;

    return (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: "description", content: data.site.siteMetadata.description },
            { name: "keywords", content: data.site.siteMetadata.tags.join(", ") },
          ]}
        />
        {children()}
        <Footer dark={this.state.useDarkTheme} />
      </div>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;

export const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title,
        description,
        tags
      }
    }
  }
`;