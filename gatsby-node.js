const axios = require("axios"); 

const urlAllPhotos = "http://sammyphotoapi-dev.us-east-1.elasticbeanstalk.com/api/photos?sortBy=date&limitTo=40";

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
      type: "flickrImageList",
      contentDigest: JSON.stringify(flickrItem)
    }
  };
}