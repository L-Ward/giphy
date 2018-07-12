$(document).ready(function () {
    //VARIABLES
    var buttonArray = ["Happy", "Jealous", "Giggly"];
    var APIKey = "yZlUH2F4Qe7wHw2uAg4siJNYjIJpUtb1"


    renderLinks();


    // This function handles events where one button is clicked
    $("#add-gif-submit").on("click", function () {
        // YOUR CODE GOES HERE
        event.preventDefault();
        var newGIF = $("#add-gif").val();
        buttonArray.push(newGIF);
        renderLinks();
        $("#add-gif").val("");
    });

    //SCREEN BUILDERS 

    //ELEMENT BUILDERS
    //link builders
    function renderLinks() {
        $("#gif-nav").empty();
        var linkList = $("<nav>");
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
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&rating=pg&api_key=" + APIKey + "&limit=9";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            console.log(res);
            $("#gif-row").empty();
            res.data.forEach(function (gifObj) {
                var cardContainer = $("<div>").addClass("col-sm-6 col-xs-12 mb-3");
                var card = $("<div>").addClass("card text-white bg-warning");
                var gif = $("<img>").attr("src", gifObj.images.fixed_height_still.url);
                gif.attr("data-still", gifObj.images.fixed_height_still.url);
                gif.attr("data-animate", gifObj.images.fixed_height.url);
                gif.attr("data-state", "still");
                gif.addClass("card-img-top")
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h5>").addClass("card-title").text(gifObj.title);
                var cardSubtitle = $("<h6>").addClass("card-subtitle").text("Rating: " + gifObj.rating);

                //appending cards to page
                cardContainer.append(card);
                card.append(gif, cardBody);
                cardBody.append(cardTitle, cardSubtitle);
                $("#gif-row").append(cardContainer);
                //click event to play gif
                gif.on("click", toggleGif);
            })
        })
    }

    //RANDOM FUNCTIONS
    // $(".gif").on("click", function () {

    function toggleGif() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "still");
        }
    }
});