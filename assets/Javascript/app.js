$(document).ready(function () {
    //VARIABLES
    var buttonArray = ["Antman", "Silver Surfer", "Squirrel Girl"];
    var APIKey = "yZlUH2F4Qe7wHw2uAg4siJNYjIJpUtb1"


    renderLinks();
    

    // This function handles events where one button is clicked
    $("#add-gif-submit").on("click", function () {
        // YOUR CODE GOES HERE
        event.preventDefault();
        var newGIF = $("#add-gif").val();
        buttonArray.push(newGIF);
        renderLinks();
    });

    //SCREEN BUILDERS 

    //ELEMENT BUILDERS
    //link builders
    function renderLinks() {
        $("#gif-nav").empty();
        var linkList = $("<div>");
        buttonArray.forEach(function (gif) {

            var gifLink = $("<div>").text(gif);
            gifLink.attr("value", gif)
            gifLink.on("click", displayGifs);

            $(linkList).append(gifLink);
            $("#gif-nav").append(linkList);
            
        });
    }


    //HANDLERS

    //AJAX CALL
    function displayGifs() {
        var gif = $(this).attr("value");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + APIKey + "&limit=9";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res){
            $("#gif-display").empty();
            res.data.forEach(function(gifObj){
                var gifContainer = $("<img>").attr("src", gifObj.images.fixed_height_still.url);
                gifContainer.addClass("p-1")
                $("#gif-display").append(gifContainer);
                console.log(res);
                console.log(gifObj.url);
            })
        })
    }

    //RANDOM FUNCTIONS
});