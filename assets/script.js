var animalList = ["kitten", "tortoise", "hedgehog", "zebra", "penguin","chipmunk"];
var interval;
/* CLICKING ON AN ANIMAL BUTTON 
/* CREATING THE ANIMAL BUTTON FROM USER INPUT */
$("#GIFME").on("submit click", function(event) {
    event.preventDefault();
    var term = $("#searchbar").val().toLowerCase();
    if (term.length > 0 && animalList.indexOf(term)==-1) {
        animalList.push(term)
        $("#searchbar").val("")
    }
    else if(animalList.indexOf(term)>-1){  
        $("#searchbar").css({
            "background":"rgba(200,0,0,0.5)",
            "border":"2px solid red",
        });
        setTimeout(function(){
            $("#searchbar").css( "text-decoration","underline line-through");
        },800);
        setTimeout(function(){
                    $("#searchbar").val("");
                    $("#searchbar").css({
                        "background":"dodgerblue",
                        "border":"inherit",
                        "text-decoration":"none"
                    });  
        },1500);

       

    }
       
    // reset search bar text
    showButtons();
});


function turnOn(img) {
    img.attr("src", img.attr("image-live"))
}

function turnOff(img) {
    img.attr("src", img.attr("image-still"))
}
$("#animalLabels").on("click", "button", function() {
    var animal = $(this).attr("data-animal").toLowerCase();
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + animal + '&api_key=LunLEs3GAJawNrYS6bzD2RHiGCt35Iny&limit=10';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        var imageContainer = $("<div>")
        var count = 0;
        // iterate through results
        for (i in results) {
            var imageOutter = $("<div class='animal'>")
            var animalImg = $("<img id='gif'>")

            // add attributes to image
            animalImg.attr("src", results[i].images.fixed_height_still.url)
            animalImg.attr("image-state", "still");
            animalImg.attr("image-still", results[i].images.fixed_height_still.url)
            animalImg.attr("image-live", results[i].images.fixed_height.url)
            animalImg.attr("data-animal", animal);


            var p = $("<p id='rating'>").text("Rated: " + results[i].rating.toUpperCase());
            var captionIt = $("<textarea data-state='hidden' class='text-center pt-3 d-none'>")
            imageOutter.append(p);
            imageOutter.append(animalImg);
            imageOutter.append(captionIt);

            // add each image div to the image container
            imageContainer.prepend(imageOutter)
        }
        $("#animalImages").html(imageContainer)
    })
});



/* SHOWING BUTTONS WORKS */
function showButtons() {
    $("#animalLabels").empty()
    for (animal of animalList) {
        var btn = $("<button>")
        btn.text(animal.toUpperCase())
        btn.addClass("animal-button btn btn-info mx-3 my-3");
        btn.attr("data-animal", animal.toUpperCase())
        $("#animalLabels").append(btn)
    }
}
showButtons();

$(document).ready(function() {
    $("#animalImages img").attr("data-state","hidden")

    $("#animalImages").on("mouseenter", "#gif", function() {
        turnOn($(this));
        $(this).attr("image-state", "live")
    }).on("click","#gif",function(){
        showTextarea($(this))
    });
    $("#animalImages").on("mouseleave", "#gif", function() {
        turnOff($(this))
        $(this).attr("image-state", "still");
    });
    
   
});
function hideTextarea(imgAbove){
    var txtA =  imgAbove.siblings().filter("textarea")
    txtA.addClass("d-none")
}
function showTextarea(imgAbove){
    var txtA =  imgAbove.siblings().filter("textarea")
    txtA.removeClass("d-none")
    txtA.css("display","table")
}

