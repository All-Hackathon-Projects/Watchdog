$(function() {
    var cover_heading = document.getElementById("cover-heading-description");
    var cover_heading_descrption = "Insightful. Personalized. Real-time.";
    var ind = 0;
    var FPS = 20;
    
    function typeWriter() {
        if (ind < cover_heading_descrption.length) {
            cover_heading.innerHTML += cover_heading_descrption.charAt(ind);
            ind++;
            setTimeout(typeWriter, 1000/FPS);
        }
        if (ind == cover_heading_descrption.length) {
            ind++;
            fadeIn();
        }
    }
    
    var startBtn = document.getElementById("start-button");
    startBtn.addEventListener("click", function(){
        window.location="loginregister.html";
    }, false);
    startBtn.style.opacity = 0;
    var opacity = 0;
    function fadeIn(){
        if(startBtn.style.opacity < 1){
            opacity += 0.1
            startBtn.style.opacity = opacity;
            setTimeout(fadeIn, 1000/FPS);
        }
    }
    typeWriter();
    
    var featuresBtn = document.getElementById("features-button");
    featuresBtn.addEventListener("click", function(){
        $('html, body').animate({
            scrollTop: $("#features").offset().top
        }, 1000);
    }, false);
    
    var homeBtn = document.getElementById("home-button");
    homeBtn.addEventListener("click", function(){
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    }, false);
});