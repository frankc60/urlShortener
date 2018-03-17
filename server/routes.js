const express = require("express");
const getShortUrl =require("./urlShortener");
const Url = require("./db/url");

const router = express.Router();


router.post("/:id", (req,res,next) => {
  console.log("api call with id: " + req.params.id);

  let urlid = req.params.id;

  getShortUrl(urlid)
  .then((d) => {
    console.log("getShortUrl = " + JSON.stringify(d.data));   
    console.log("ss: " + d.data.id);
   
    let newUrl = new Url({
      "longUrl":  req.params.id,
      "shortUrl": d.data.id
    });
    
    newUrl.save((err,newUrl) => {
      if(err) {
        console.log("error " + err);
      } else {
        console.log("save successful, " + newUrl.shortUrl);
   
        res.setHeader('Content-Type', 'application/json'); 
        res.send(JSON.stringify({long: `${urlid}`, short: `${d.data.id}` }) );
      }
    
    })
    
   
  })
  .catch((err) => {
    console.error("getShortUrl Error: " + err);
    next();
  });

 
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