import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Header from "../components/Header";

const DeveloperPage = ({data}) => {

  const posts = data.allMarkdownRemark.edges
    .map( edge => edge.node )
    .filter( post => post.frontmatter.published );

  return (
    <div>
      <Header dark/>
      <Experiences posts={posts} />
    </div>
  );
};

class Experiences extends React.Component{

  //All filters are active to start with because 
  // we display all posts of type == something on the filters
  state = {
    allFilters: ["work", "project", "media"],
    activeFilters: ["work", "project", "media"]
  }

  setFilters = (newFilters)=>{
    this.setState({
      activeFilters: newFilters
    });
  }

  render(){

    //Get the posts from the query
    const {posts} = this.props;

    //We create the filtered posts here because it would be easier than 
    // having them as state
    const filteredPosts = posts
      .filter( post => 
        this.state.activeFilters.includes(post.frontmatter.type));

    return (
      <ExperiencesContainer>
        <ExperiencesTitle>Experiences:</ExperiencesTitle>
        <PostsFilter 
          allFilters={this.state.allFilters}
          activeFilters={this.state.activeFilters}
          setFilters={this.setFilters} />
        <hr/>
        {filteredPosts.map((post) => 
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

class PostsFilter extends React.Component {

  //From the list of active filters, we need to
  // figure out if we add or remove an item from the list.
  // I first wanted to keep an object of all the filter where
  // [filterName]: active (true) OR not active (false) 
  // but it was challenging and annoying having that around along with
  // the array of active filters that came from as props.
  toggleSingleFilter = (filter) => {
    if(this.props.activeFilters.includes(filter))
      return this.props.activeFilters.filter( fil => fil != filter);
    else
      return [...this.props.activeFilters, filter];
  }

  render(){

    const {
      allFilters,
      activeFilters,
      setFilters 
    } = this.props;

    return (
      <FilterWrapper>
        {allFilters
          .map((filter) => 
            <FilterItem
              key={filter} 
              active={activeFilters.includes(filter)}
              onClick={() => setFilters(this.toggleSingleFilter(filter))}>
              {filter}
            </FilterItem>)}
      </FilterWrapper>
    );
  }
}

const PostContainer = styled.div`
  margin-bottom: 1rem;
  border-left: 0.2rem solid rgba(204, 204, 204, 0);
  padding-left: 0.3rem;
  &:hover {
    border-left: 0.2rem solid rgba(204, 204, 204, 1);    
  }
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
  @media(max-width: 1000px){
    max-width: 85%
  }
  @media(max-width: 650px){
    max-width: 95%
  }
`;

const ExperiencesTitle = styled.h3`
  font-size: 1.3rem;
  line-height: 1.3rem;
  margin-bottom: 1.3rem;
`;

const FilterItem = styled.div`
  color: rgb(115, 115, 115);
  opacity: ${ ({active}) => (active)? "1" : "0.5" };
  cursor: pointer;   
  &:before{
    content: '#';
    color: rgb(204, 204, 204);
    font-weight: 300;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
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