$(function() {
    $("#logout-button").click(function() {
        var reqBody = {
            "message": "Logged out"
        }
        console.log();
        $.ajax({
                url: "https://auth.afforest89.hasura-app.io/user/logout",
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('Authorization').toString());
                },
                type: "POST",
                data: JSON.stringify(reqBody),
            })
            .done(function(data) {
                window.location = "index.html";
            })
            .fail(function() {
                alert("Error");
            });
    });

    var video = document.querySelector("#webcamStream");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, handleVideo, videoError);
    }

    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {
        // do something
    }
});