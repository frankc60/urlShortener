//console.log("hello world"); 

$('document').ready(function(){
  $("#submit").on("click", ()=> {
    let u = encodeURIComponent($("#fUrl").val());
    //console.log("button clicked " + u);
    $.ajax({url: "/api/" + u, type: "POST", success: function(result){
      let exst = $("#results").html();
      $("#results").html(`${exst}<p>${result.long} - <a href="${result.short}" target="_blank">${result.short}</a></p>`);
  }});
  });

});