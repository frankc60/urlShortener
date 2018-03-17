import $ from "jquery";

window.$ = $;
window.jQuery = $;

import "bootstrap";


import 'bootstrap/dist/css/bootstrap.min.css';
import './../public/css/style.css';

$('document').ready(function(){
  $("#submit").on("click", ()=> {
    let u = encodeURIComponent($("#fUrl").val());
    //console.log("button clicked " + u);
    $.ajax({url: "/api/" + u, type: "POST", success: function(result){
      let exst = $("#results").html();
      $("#results").html(`${exst}<p>${result.long} - <a href="${result.short}" target="_blank">${result.short}</a></p>`);
  }});
  });

  //query();

  var head = document.getElementsByTagName('body')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "/js/jquery.min.js";


});