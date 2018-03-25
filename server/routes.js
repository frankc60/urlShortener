const express = require("express");
const getShortUrl =require("./urlShortener");
const Url = require("./db/url");

const validUrl = require("./validUrl");

const router = express.Router();


router.post("/:id", (req,res,next) => {
  console.log("api call with id: " + req.params.id);

  let urlid = req.params.id;

  validUrl(urlid)
    .then((x) => {
      console.log("x " + x);
      return getShortUrl(urlid);  //returns a promise, so will wait, then go to next .then() - or catch() if rejected.
    })
    .then((d) => {
     console.log("getShortUrl = " + JSON.stringify(d.data.id));   
     // console.log("ss: " + d.data.id);
      
      let newUrl = new Url({  //mongoose Schema document
        "longUrl":  urlid,
        "shortUrl": d.data.id
      });
      //console.log("222")
      
      return newUrl.save(); //is a promise, so pass onto next then()
      /*
      .catch((err) => {
        console.log("Error: " + err);
        res.status(500).send({ "msg" : `Error ${err}` });
      })
      */
    })
    .then((newUrl) => {
      console.log("success, now resolve")
     // return new Promise((resolve,reject)=> {reject("errordsdsds")});
      //throw ("error");//newUrl);
     // Promise((resolve,reject) => reject("errordsdsds"));
      console.log("save successful, " + newUrl.shortUrl);
      res.setHeader('Content-Type', 'application/json'); 
      res.send(JSON.stringify({long: `${urlid}`, short: `${newUrl.shortUrl}` }) );  
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.status(500).send({ "msg" : `Error ${err}` });
    })
  

 
})





/*
getShortUrl(url)
  .then((d) => {
    console.log("getShortUrl = " + JSON.stringify(d.data));   
    console.log("ss: " + d.data.id) 
  })
  .catch((err) => {
    console.error("getShortUrl Error: " + err);
  });
*/


module.exports = router;