// Show Navbar
$.get("/html/navbar.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});


// Show Footer
$.get("/html/footer.html", function(data){
    $("#footer-placeholder").replaceWith(data);
});


// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-244951959-1');


// Animation
var typed = new Typed(".type", {
    strings: ["do research", "offer councel", "design interfaces"],
    typeSpeed: 150,
    backSpeed: 150,
    loop: true
})