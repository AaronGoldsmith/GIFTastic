var animalList = [];
var activeAnimal = "";
var answer;
$(document).ready(function(){
    $("#gif").on("click",function(){
        var animal = $(this).attr("data-animal");
        var movingURL = $(this).attr("image-live");
        var stillURL = $(this).attr("image-still)")
        if($(this).attr("image-state")==="still"){
            $(this).attr("image-state","live")
            $(this).attr("src",movingURL)
        }
        else{
            $(this).attr("image-state","still")
            $(this).attr("src",stillURL)
        }
    })

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

    $("#animalLabels").on("click","button", function(){
        if(activeAnimal!=""){
            $("#animalImages").empty();
        }
        var animal = $(this).attr("data-animal").toLowerCase();
            var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + animal + '&api_key=LunLEs3GAJawNrYS6bzD2RHiGCt35Iny&limit=15';
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            var imageContainer = $("<div>");
            
            for(i in results){
                var imageOutter = $("<div class='animal'>")
                var animalImg = $("<img>")
                animalImg.attr("src",results[i].images.fixed_height_still.url)
                animalImg.attr("image-state","still");                                  
                animalImg.attr("image-still",results[i].images.fixed_height_still.url)
                animalImg.attr("image-live",results[i].images.fixed_height.url)
                animalImg.attr("data-animal",animal)
                var p = $("<p id='rating'>").text("Rating: " + results[i].rating.toUpperCase());
     
                imageOutter.append(p);
                imageOutter.append(animalImg);
                $(imageContainer).prepend(imageOutter)
            }
            $("#animalImages").html(imageContainer);
        })
    });
})


/* SHOWING BUTTONS WORKS */
function showButtons(){
    $("#animalLabels").empty()
    for(animal of animalList){
        var btn = $("<button>")
        btn.text(animal.toUpperCase())
        btn.addClass("animal-button btn btn-primary mx-3 my-3");
        btn.attr("data-animal",animal.toUpperCase())
        $("#animalLabels").append(btn)
    }
}
showButtons();
