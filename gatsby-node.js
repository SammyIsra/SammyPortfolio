const axios = require("axios"); 
const {createFilePath} = require("gatsby-source-filesystem");
const path = require("path");


const urlAllPhotos = "https://sammy-photos.herokuapp.com/api/photos?sortBy=date&limitTo=40";

exports.sourceNodes = function({boundActionCreators}){
  
  const {createNode} = boundActionCreators;
  
  return new Promise((resolve, reject) => {

    //All photos
    axios(urlAllPhotos)
      .then( (res) => {
        res.data.forEach(element => {
          createNode(processFlickrImageList(element));
        });
        resolve();
      })
      .catch( err => {
        reject(err);
      });
  });
};

function processFlickrImageList(flickrItem){
  return {
    ...flickrItem,
    children: [],
    //fields: flickrItem,
    parent: null,
    internal: {
      type: "flickrImage",
      contentDigest: JSON.stringify(flickrItem)
    }
  };
}

exports.onCreateNode = function({node, getNode, boundActionCreators }){
  const {createNodeField} = boundActionCreators;
  if(node.internal.type === "MarkdownRemark"){
    const fileNode = getNode(node.parent);
    const slug = createFilePath({node, getNode, basePath: "pages"});
    createNodeField ({
      node,
      name: "slug",
      value: `/posts${slug}`
    });
  }
};

exports.createPages = function({graphql, boundActionCreators}){

  const {createPage} = boundActionCreators;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields { 
                slug
              }
            }
          }
        }
      }
    `)
      .then( (result) => {
        result.data.allMarkdownRemark.edges.forEach(
          ({node}) =>
            createPage({
              path: node.fields.slug,
              component: path.resolve("./src/templates/blog-post.js"),
              context: {
                slug: node.fields.slug
              }
            })
        );        
        resolve();
      });
  });
};