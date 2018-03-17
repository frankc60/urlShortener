const {google} = require('googleapis');
const nconf = require('nconf');
//const fs    = require('fs');


//const auth = 'AIzaSyD6ajt-YAqVb22wr4G4F71ott0fHW7X7zY';

nconf.use('memory');
nconf.file({ file: '/home/frank/Documents/dev/nodejs/prvConfig.json' });  //don't add to git, prv keys

let googleApi = nconf.get("googleUrlShortenerApiKey");
//console.log("v" +v);


const urlshortener = google.urlshortener({ version: 'v1', auth: googleApi });

const getShortUrl = (url) => {
  return new Promise((resolve,reject) => {
  
    urlshortener.url.insert({
      resource: {
        longUrl: url
      }
    }, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
      //console.log(res.data);
    });
  
  })

}

/*
urlshortener.url.get({
  shortUrl: 'http://goo.gl/DdUKX'
}, (err, res) => {
  if (err) {
    throw err;
  }
  console.log(res.data);
});

urlshortener.url.insert({
  resource: {
    longUrl: 'https://www.udemy.com/'
  }
}, (err, res) => {
  if (err) {
    throw err;
  }
  console.log(res.data);
});
*/
module.exports = getShortUrl;