import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";

import Header from "../components/Header";
import {Footer} from "../components/Footer";
//import "./index.css";

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