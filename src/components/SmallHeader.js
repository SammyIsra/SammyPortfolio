import React from "react";
import styled from "styled-components";
import GLink from "gatsby-link";


function SmallHeader(props) {
  return (
    <HeaderContainer className="SmallHeader">
      <HeaderTitle>
        <Link to="/">[Sammy Israwi]</Link>
      </HeaderTitle>
      <HeaderSubtitleItem order="1">
        <Link to="/developer">Developer</Link>
      </HeaderSubtitleItem>
      <HeaderSubtitleItem order="3">
        <Link to="/photographer">Photographer</Link>
      </HeaderSubtitleItem>
    </HeaderContainer>
  );
}

export default SmallHeader;

function Link({to, children}){
  return (
    <GLink 
      to={to}
      style={{ 
        textDecoration: "none", 
        color: "inherit",
        backgroundImage: "inherit" }}>
      {children}
    </GLink>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: flex-end;
`;

const HeaderTitle = styled.div`
  font-size: 2rem;
  line-height: 2rem;
  margin-top: 20px;
  order: 2;
  text-align: center;
  @media(max-width: 600px){
    width: 100%;
    order: 0;
  }
`;

const HeaderSubtitleItem = styled.div`
  order: ${props => props.order};
`;