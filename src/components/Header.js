import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

//Aditional rules I can't fix w styled components ☹️
import "./Header.css";

const HeaderContainer = styled.header`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeaderMask = styled.div`
  margin-left: 0;
  margin-right: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props => 
    props.dark 
      ? "rgba(0, 0, 0, 0.35)"
      : "rgba(255, 255, 255, 0.35)"};
`;

const Title = styled.div`
  margin: 2% auto;
  text-transform: uppercase;
  padding: 2px 10px 0px 10px;
  margin: 20px;
  font-size: 4.5rem;
  line-height: 4.5rem;
  text-decoration: none;
  color: ${ props => props.dark ? "white" : "black"};
  border: 3px solid ${ props => props.dark ? "white" : "black" };
  &:hover {
    color:  ${ props => props.dark ? "black" : "white"};
    border: 3px solid  ${ props => props.dark ? "black" : "white"};
    background-color:  ${ props => props.dark ? "white" : "black"};
  }
`;

const Subtitle = styled.div`
  font-size: 1.7rem;
  text-decoration: none;
  color: ${ props => props.dark ? "white" : "black"};
`;

export default function Header({dark}){
  return(
    <HeaderContainer>
      <HeaderMask dark={dark}>
        <Link to="/">
          <Title dark={dark}>Sammy Israwi</Title>
        </Link>
        <Subtitle dark={dark}>
          <Link to='/developer'>DEVELOPER</Link>
          &nbsp;|&nbsp; 
          <Link to='/photographer'>PHOTOGRAPHER</Link>
        </Subtitle>
      </HeaderMask>
    </HeaderContainer>
  ); 
}