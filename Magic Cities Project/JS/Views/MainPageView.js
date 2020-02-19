//################# Import section ###############
import{
    cities,    
    setCurrentCity,    
    sortComments,
    sortLikes,
    sortRecent,
    getCurrentLvl
} from "../Controllers/citiesController.js"

import{userSorting,users}from "../Controllers/usersController.js"



//######################### Button fuctions ####################
let buttonPerfil = document.getElementById("perfilButton"); 
buttonPerfil.addEventListener("click", function(){
    window.location.href="PerfilPage.html"
})


let quizButton = document.getElementById("quizButton"); 
quizButton.addEventListener("click", function(){
    window.location.href="QuizPage.html"
})

let catalogButton = document.getElementById("btnCatalog"); 
catalogButton.addEventListener("click", function(){
    window.location.href="CatalogPage.html"
})

//##################Top card cities fuctions ######################

function renderTops(filterType = ""){

    
    const myTops = document.querySelector("#myTopcards")
    let result = ""
    let i = 0 // we only want to show the top 4 cards
    myTops.innerHTML = result // try to clear the top has a test first

    for (const city of cities) {
        // ############# appled filter will sort tops (if conditions)   #######

        if(filterType == "Recent"){sortRecent()}
        else if (filterType == "Votes"){sortLikes()}
        else if (filterType == "Comments"){sortComments()}
        else{sortRecent()}    // when entering the mainpage, the default will be to sort by recent,

        // Create a line
        
        
        // Generate a card
        result += `
        <div class="col-md-3 ">
            <div class="card btn-Hover">    
                <div class="card-body rounded-lg">
                    <img class="card-img-top rounded-lg img-Size" src="${city.cover}">
                    <br><br>
                    <h4 class="card-title font-weight-bold">${city.name}</h4>
                    <p class="card-text"> <spam class="font-weight-bold">Ano Fundada:</spam> ${city.date} </p>
                    <p class="card-text"> <spam class="font-weight-bold">Zona</spam>: ${city.zone} </p>
                   
                    <button type="button" id="${city.name}" class="btn btn-primary view"> Visitar Pagina</button>

                    <div class="row" style="padding-top: 2%">
                        <div class="col"> ${city.faves} <img src="../misc/Images/favorite-heart-button-click.png" style="width: 20px; height: 20px;"></div>
                        <div class="col"> ${city.comments} <img src="../misc/Images/comment-black-oval-bubble-shape.png" style="width: 20px; height: 20px;"></div>
                        <div class="col font-weight-bold"> LV: ${city.level}</div>
                        
                    </div>       
                </div>              
            </div>
        </div>
        `
        
        i++
        

        //breaks from the loop once we print the top 4, in this case i is our counter
        if(i === 4){
            break
        }



    }
    


    // adding all generated catalongs to the id myCatalog
    myTops.innerHTML = result

    //this is the code of the button to acess the cities page, and we have to make sure the city un acessable if lower lvl
    // Making the buttons work, add a lvl rescriction whit an if codintion (make the buttons disable)
    const btnsCity = document.getElementsByClassName("view")
    for (const elem of btnsCity) {
        elem.addEventListener("click", function () {
            if(sessionStorage.getItem("userLvl") >= getCurrentLvl(this.id)){
                setCurrentCity(this.id)
            }
            else{
                Swal.fire(
                    'Nivel Baixo!',
                    'O seu Nivel é demasiado baixo! Joga quizzes para ganhares XP e aumentar o seu nivel!',
                    'error'
                  )
            }
        })
    }

    
    

    
}

renderTops()

// fuction for the filter button
document.querySelector("#btnFilter").addEventListener("click", function () {
    const txtFilter = document.querySelector("#sltFilter").value;    
    // render the top cards whit the filter type choosen
    renderTops(txtFilter)
    renderTops(txtFilter)
     // for some reason atm theres a bug where the first card doesnt update and a second button press is needed so im running the render a second time for the time being
})

document.querySelector("#rankBtn").addEventListener("click", function(){
    // sort user levels
    userSorting()
    document.querySelector("#usernameFirst").innerHTML = users[1].username
    document.querySelector("#levelFirst").innerHTML = users[1].level

    document.querySelector("#usernameSecond").innerHTML = users[2].username
    document.querySelector("#levelSecond").innerHTML = users[2].level

    document.querySelector("#usernameThird").innerHTML = users[3].username
    document.querySelector("#levelThird").innerHTML = users[3].level

    document.querySelector("#usernameFourth").innerHTML = users[4].username
    document.querySelector("#levelFourth").innerHTML = users[4].level

  



})


