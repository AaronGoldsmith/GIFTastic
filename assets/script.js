var animalList = ["Kitty","Rhino","Donkey","Zebra","Doge"];
var answer;

    /* CLICKING ON AN ANIMAL BUTTON 
    /* CREATING THE ANIMAL BUTTON FROM USER INPUT */
    $("#GIFME").on("submit click", function(event) {
        event.preventDefault();
        var term = $("#searchbar").val();
        if(term.length>0){
            term.trim();
            animalList.push(term)
            $("#searchbar").val("")
        }
        // reset search bar text
        showButtons();
    });
   

   function turnOn(img){
        img.attr("src",img.attr("image-live"))
   }
   function turnOff(img){
         img.attr("src",img.attr("image-still"))
    }
    $("#animalLabels").on("click","button", function(){
        var animal = $(this).attr("data-animal").toLowerCase();
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + animal + '&api_key=LunLEs3GAJawNrYS6bzD2RHiGCt35Iny&limit=10';
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            var imageContainer = $("<div>")
            console.log(results)

            // iterate through results
            for(i in results){
                var imageOutter = $("<div class='animal'>")
                var animalImg = $("<img id='gif'>")

                // add attributes to image
                animalImg.attr("src",results[i].images.fixed_height_still.url)
                animalImg.attr("image-state","still");                                  
                animalImg.attr("image-still",results[i].images.fixed_height_still.url)
                animalImg.attr("image-live",results[i].images.fixed_height.url)
                animalImg.attr("data-animal",animal);
            
                var p = $("<p id='rating'>").text("Rated: " + results[i].rating.toUpperCase());
                var captionIt = $("<textarea>")
                captionIt.css('visibility','hidden')
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
function showButtons(){
    $("#animalLabels").empty()
    for(animal of animalList){
        var btn = $("<button>")
        btn.text(animal.toUpperCase())
        btn.addClass("animal-button btn btn-info mx-3 my-3");
        btn.attr("data-animal",animal.toUpperCase())
        $("#animalLabels").append(btn)
    }
}
showButtons();

$(document).ready(function(){
    $("#animalImages").on("mouseenter","#gif",function(){
        turnOn($(this));
        $(this).attr("image-state","live")
    })
    $("#animalImages").on("mouseleave","#gif",function(){
        turnOff($(this))
        $(this).attr("image-state","still");
    });
    // $("#animalImages").on("click",function(){
    //     var state = $(this).attr("image-state");
    //     if(state ==="still"){
    //         turnOn($(this))
    //         $(this).attr("image-state","live");

    //     }
    //     else if(state =="live"){
    //         turnOff($(this))
    //         $(this).attr("image-state","still");
    //     }
    // });

})