const express = require("express");
const ejs = require("ejs");
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpageConfig = require("../webpack.config.js")

const router = require("./routes");
const compiler = webpack(webpageConfig);
const app = express();


app.use(middleware(compiler, {
  // webpack-dev-middleware options
}));

app.set("view engine", "ejs");

app.use(express.static("dist"));
app.use(express.static("public"));

app.get("/",(req,res) => {
  console.log("/ homepage requested");
  res.render("index");
})

app.use("/api",router);

const PORT  = app.settings.env.port || 8080;
const IP    = "0.0.0.0";
const MODE  = app.settings.env || "development";

app.listen(PORT, IP, () => {
  console.log(`listening @ http://${IP}:${PORT} mode:${MODE}`);
})