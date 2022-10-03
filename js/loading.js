/* LOADING */
var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 4000);
}

function showPage() {
  document.getElementById("loader").style.display = "none"; 
  document.getElementById("timeOut").style.visibility = "visible"; // show page after the loading animation
}