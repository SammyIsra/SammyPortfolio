import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

import Header from "../components/Header";

//import bgImage from "../assets/title-background.jpg";

function PhotographerPage({data}){
  const photos = data.allFlickrImageList.edges.map( x => x.node );
  console.log(photos);
  //const images = PhotographerPageQuery.edges.node;
  return (
    <div>
      <Header dark useImage page="photographer" />
      <div>
        <PhotoStream photos={photos} />
      </div>
    </div>
  );
}

export default PhotographerPage;


const PhotoStreamContainer = styled.div`
  line-height: 0;
  width: 85%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  column-count: 3;
  column-gap: 0px;
  @media(max-width: 1000px){
    column-count: 2;
  }
  @media(max-width: 600px){
    column-count: 1;
  }
`;

const PhotoItem = styled.img`
  max-width: 100%;
  width: 100%;
  opacity: 1;
  margin-bottom: 0;
  &:hover{
    opacity: 0.8;
  }
`;

function PhotoStream({photos}){
  return (
    <PhotoStreamContainer>
      { photos.map(x => 
        <PhotoItem 
          key={x.title} 
          src={x.url_m} 
          alt={x.title} />)}
    </PhotoStreamContainer>
  );
}


export const query = graphql`
  query PhotographerPageQuery {
    allFlickrImageList {
      edges{
        node {
          title
          url_m
          height_m
          width_m
          url_l
          height_l
          width_l
          title
        }
      }
    }
  }
`;