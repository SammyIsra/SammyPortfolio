import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Header from "../components/Header";

const DeveloperPage = ({data}) => {

  data.allMarkdownRemark.edges
    .forEach( edge => console.log(edge.node) );

  const posts = data.allMarkdownRemark.edges
    .map( edge => edge.node )
    .filter( post => post.frontmatter.published );

  //posts.forEach(post => console.log(post.frontmatter));

  return (
    <div>
      <Header dark/>
      <Experiences posts={posts} />
    </div>
  );
};

class Experiences extends React.Component{

  render(){

    //Get the posts from the query
    const {posts} = this.props;

    return (
      <ExperiencesContainer>
        <ExperiencesTitle>Experiences:</ExperiencesTitle>
        <hr/>
        {posts.map((post) => 
          <DeveloperPost 
            key={post.frontmatter.title}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            timeToRead={post.timeToRead}
            type={post.frontmatter.type} />)}
      </ExperiencesContainer>
    );
  }
}

function DeveloperPost({title, description, type}) {
  return (
    <PostContainer>
      <PostTitle>{title}</PostTitle>&nbsp;
      <PostType>{type}</PostType>
      <PostDescription>{description}</PostDescription>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  margin-bottom: 1rem;
`;

const PostTitle = styled.h2`
  display: inline;
  line-height: 1.80rem;
  font-size: 1.80rem;
`;

const PostDescription = styled.p`
  margin-bottom: 0;
`;

const PostTTR = styled.p`
  display: inline;
  font-style: italic;
  color: rgb(115, 115, 115);
`;

const PostType = styled.span`
  color: rgb(115, 115, 115);
  line-height: 1.75rem;
  font-size: 1.75rem;
  margin-bottom: 0;
  &:before{
    content: '#';
    color: rgb(204, 204, 204);
    font-weight: 300;
  }
`;

const ExperiencesContainer = styled.div`
  max-width: 75%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ExperiencesTitle = styled.h3`
  font-size: 1.3rem;
  line-height: 1.3rem;
  margin-bottom: 1.3rem;
`;

export default DeveloperPage;

export const query = graphql`
  query PostsData {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
            description
            type
            published
          }
          timeToRead
          html
        }
      }
    }
  }
`;