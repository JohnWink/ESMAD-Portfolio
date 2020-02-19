
 //######################## IMPORT and getting the set city item #######
import {
    getCurrentCity,
    cityLike,
    cities
} from "../Controllers/citiesController.js"

import{
    userLikeAdd,
    userLikeRemove
} from "../Controllers/usersController.js"

import{
    comments,
    addComment,
    currentDate,
    commentReverse
} from "../Controllers/commentController.js"




const city = getCurrentCity()







//############################ city information injection codes ############################
//test
document.querySelector("#imgBrasao").src = city.brasao;
document.querySelector("#cityDate").innerHTML = `<span class="font-weight-bold">Data Fundada: ${city.date} </span>`;
document.querySelector("#cityName").innerHTML = city.name;
document.querySelector("#cityZone").innerHTML = `<span class="font-weight-bold">Zona: ${city.zone} </span>`;
document.querySelector("#cityLevel").innerHTML = `<span class="font-weight-bold">Nivel: ${city.level} </span>`;
document.querySelector("#cityUpload").innerHTML = `<span class="font-weight-bold">Addicionado: ${city.upload} </span>`;
document.querySelector("#cityFave").innerHTML = `<span class="font-weight-bold ">Gostos: </span><span id="renderFave">${city.faves}</span> <button id="btn-Heart" type="button" class="btn btn-outline-danger">
<img id="img-heart" src="../misc/Images/favorite-heart-button.png" style="width: 20px; height: 20px;">
</button>`;
document.querySelector("#googleMap").src = city.map;
//sence likes change whit the button it will need to be in a render fuction
function renderLikes(){
    document.querySelector("#renderFave").innerHTML = `${city.faves}`;
}

document.querySelector("#cityDesc").innerHTML = city.desc;
document.querySelector("#cityLink").href = city.link;


//################## fuctions for the JS view content ###################




//########################Galery pic injection js codes ##########################

//####################comments inections codes#################################
function renderComment(){
    const myComment = document.querySelector("#commentView")
    let result = "";
    let comCount = 0;
    // reverse tthe order of the comments from new to old (the comments array are from old to new,)
    commentReverse();

    for (const comment of comments) {
        //needs a filter of the current city

        const currentCity = city.name;

        if (currentCity !== "" && !comment.cityname.startsWith(currentCity))
         {
            continue;
        }

        //after the filter is applyed it will insert in the catalog
        result += `
                    <div class="container-fluid bg-light rounded-lg " style="width: 95%; ">
                        <!--name and date row-->
                        <div class="row justify-content-between" >
                        <div class="col-2 font" style="font-weight: bold; padding-left: 5px; padding-right: 5px;">
                            <span>${comment.username}<span>
                        </div>
            
                        <div class="col-2 " style="padding-left: 5px; padding-right: 5px;">
                            <span>${comment.date}</span>
                        </div>
            
                        </div>
                        <!-- the comment!-->
                        <div class="row " style="padding: 1%">
                        <span>${comment.comment}</span>
                        </div>
            
            
                    </div>
                    <br>`
        comCount += 1;

    }
    //reverting back to normal order from old to new
    commentReverse();
    // add the counter to the cities.commentlocal storage
    

    city.comments = comCount;
    localStorage.setItem("cities", JSON.stringify(cities));
    

    myComment.innerHTML = result;            

}

renderComment();

// adding te comment 
const btnComment = document.querySelector("#btn-comment");
btnComment.addEventListener("click", function(){

    
    // when clicked it will fetch the session username, get the date and get te comment from the comment area then refresh
    const cityComment = city.name;
    const userComment = sessionStorage.getItem("loggedUser");
    //get the current date in hh:mm dd-mm-yyyy  (need to add a fucntion that add a 0 for when its less then 10 )
    let fullDate = "";
    const dateComment = currentDate(fullDate); 
    //getting the value of the textArea so we can add to the comment object bundle
    const stringComment = document.querySelector("#commentArea").value;   
    addComment(cityComment,userComment,dateComment,stringComment);
    //after the comment is added it will render the comments and clean the comment area
    document.querySelector("#commentArea").value = "";

    renderComment();
    


})



//####################### button Likes fucntions and listeners ##################
const imgHeart = document.getElementById("img-heart");
const btnHeart = document.getElementById("btn-Heart");
let keyswitch = 0;

// check if the user has liked the city before, not allowing him to like more then 1 time (remember its gonna be an array of items, so its a for cycle)
// if the user has liked it then the keyswitch will be 1 and the heart pic will be red

//fuction to check if the user has liked it and alter the buttons like setting
function likeChecker(){
    // if condition, if the user has liked this then set keyswitch=1, if not then leave it has default keyswitch=0
    let strLikes = sessionStorage.getItem("userLikes");
    let checker = strLikes.includes(city.name);
    if(checker == true){
        keyswitch = 1
        imgHeart.src = "../misc/Images/favorite-heart-button-click.png";

    }

}
likeChecker();

// fuctions on the like button 
btnHeart.addEventListener("click", function (){

    
    //key conditions to set what kind of like and alow to add and remove 1 like 
    if(keyswitch == 1){
        // this condition will remove the like
        imgHeart.src = "../misc/Images/favorite-heart-button.png"
        keyswitch = 0
        // changing the information on the object, removing the city from the userLikes
        cityLike(city.name, keyswitch);
        userLikeRemove(city.name);
        renderLikes();
        
    }
    else{
        //this condition will add a like, adding the city to the userLikes
        imgHeart.src = "../misc/Images/favorite-heart-button-click.png";
        keyswitch = 1
        // changing the information on the object
        cityLike(city.name, keyswitch);
        userLikeAdd(city.name);
        renderLikes();
    }
    
});

//#################### cities gallery html injection ##############################

const cityGallery = document.querySelector("#cityGallery")
let galleryHtml = "";

for(const image of city.gallery){
    galleryHtml += `
    <div class="col-md-3">
        <img class="img-fluid " src=${image}>              
    </div>`;
    

}

cityGallery.innerHTML = galleryHtml;


