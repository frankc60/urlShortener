const {google} = require('googleapis');
const nconf = require('nconf');
//const fs    = require('fs');



nconf.use('memory');
nconf.file({ file: '/home/frank/Documents/dev/nodejs/prvConfig.json' });  //don't add to git, prv keys

let googleApi = nconf.get("googleUrlShortenerApiKey");
//console.log("v" +v);


const urlshortener = google.urlshortener({ version: 'v1', auth: googleApi });
/*
const timer = (x) => {
  return new Promise((resolve, reject) => {

    console.log("timer("+x+")");
    setTimeout(()=>{
      console.log("urlShortener.js: timerr('"+x+"')");
      resolve({data: {"created":"2018-03-18T10:09:32.612Z","_id":"5aae3adc96e1fc0fb3875e3f","longUrl":"Hellowo","id":"https://goo.gl/f6V3U8","__v":0}});
    },x);

  })
}

const fakeCall = async(k) => {

  console.log("fakeCall(" + k + ")");
  console.log("call timer()");
  let f = await timer(4000);
  console.log("got reply from timerr()");
  return (f);  //is a promise because using await on function.
}
*/

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
module.exports =  getShortUrl;