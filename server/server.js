const express = require("express");
const ejs = require("ejs");
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpageConfig = require("../webpack.config.js")

const Url = require("./db/url");

const router = require("./routes");
const compiler = webpack(webpageConfig);
const app = express();


app.use(middleware(compiler, {
  // webpack-dev-middleware options
}));

app.set("view engine", "ejs");

app.use(express.static("dist"));
app.use(express.static("public"));


let obj = [
  { longUrl: "http://111.com", shortUrl: "http://1.com" },
  { longUrl: "http://222222.com", shortUrl: "http://2.com" },
]


app.get("/", (req,res) => {
  console.log("/ homepage requested");
  

  
    const results =  Url.find({}, (err, doc) => {
      if(err) {
        console.log("error " + err)
        //process.exit();
      } else {
        console.log(JSON.stringify(doc));
        res.render("index", {data: doc});

      }
    });
    


})

app.use("/api",router);

const PORT  = app.settings.env.port || 8080;
const IP    = "0.0.0.0";
const MODE  = app.settings.env || "development";

app.listen(PORT, IP, () => {
  console.log(`listening @ http://${IP}:${PORT} mode:${MODE}`);
})