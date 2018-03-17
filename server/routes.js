const express = require("express");
const getShortUrl =require("./urlShortener");

const router = express.Router();


router.post("/:id", (req,res,next) => {
  console.log("api call with id: " + req.params.id);

  let url = req.params.id;

  getShortUrl(url)
  .then((d) => {
    console.log("getShortUrl = " + JSON.stringify(d.data));   
    console.log("ss: " + d.data.id);
    res.setHeader('Content-Type', 'application/json'); 
    res.send(JSON.stringify({long: `${url}`, short: `${d.data.id}` }) );
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