/* ################### Import section ################# */
import{
    cities,
    sortCities,
    setCurrentCity,
    getCurrentLvl,
    removeCity
} from "../Controllers/citiesController.js"




/* ######################### Fucntion CALLER  section when entering the first time ################### */
renderCatalog()

/* ########################### Fuction code section ######################## */

function renderCatalog (filterName = "", filterZone = ""){
    const myCatalog = document.querySelector("#myCatalog")
    let result = ""
    let i = 0 // 4 cards per line so max i = 4

       
    for (const city of cities) {
        // #############Aplicação do filtro (we need to fix the filter where lword seperation, like searching for Delgada works ) #######

        // gets the cities name and turns it in to a lowercase
        let cityLow = city.name;
        cityLow = cityLow.toLowerCase();

        //seperate the city's string name , if mre then 2 works

        if ((filterName !== "" && !cityLow.includes(filterName)) ||
            (filterZone !== "" && city.zone !== filterZone)
        ) {
            continue;
        }
        
        // Criação de linha
        if (i % 4 === 0) {
            result += `<div class="row  align-self-center" style="padding: 3%">`
        }
        
        // Geração do card
        result += `
        <div class="col-md-3 ">
            <div class="card btn-Hover">    
                <div class="card-body rounded-lg">
                    <img class="card-img-top rounded-lg img-Size" src="${city.cover}">
                    <br><br>
                    <h4 class="card-title font-weight-bold">${city.name}</h4>
                    <p class="card-text"> <spam class="font-weight-bold">Ano Fundada:</spam> ${city.date} </p>
                    <p class="card-text"> <spam class="font-weight-bold">Zona</spam>: ${city.zone} </p>

                    <div class="row" style="padding-top: 2%">
                        <div class="col"><button type="button" id="${city.name}" class="btn btn-primary view"> Visitar Pagina</button></div>`
                        if(sessionStorage.getItem("admin") == "true"){ 
                            
                            // if the user is an admin thne the remove button will show
                            result+= `<div class="col"><button type="button" id="${city.name}" class="btn btn-danger remove"> Remover</button></div>`
                        }
                                            
                    result+=`</div>

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
        // Criação do fecho da linha
        if (i % 4 === 0) {
            result += `</div>`
        }
    }
    


    // adding all generated catalongs to the id myCatalog
    myCatalog.innerHTML = result

    //this is the code of the button to acess the cities page, and we have to make sure the city un acessable if lower lvl
    // Making the buttons work, add a lvl rescriction whit an if codintion 
    const btnsCity = document.getElementsByClassName("view")
    for (const elem of btnsCity) {
        elem.addEventListener("click", function () {
            //in condition where, if the user is too low it doesnt allow to go to the cities page and a promp will show warning the player
            //ask the teacher on this part , im thinking a fuction to find the cities possition sence we DO have the cities name in the buttions id 
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
    

    // fuction of the Remove button
    const btnsRemove = document.getElementsByClassName("remove")
    for (const elem of btnsRemove) {
        elem.addEventListener("click", function () {             
            // will need a sweet  alert to confirm the awnser
            Swal.fire({
                title: 'Tem a certeza?',
                text: "A cidade vai ser removida!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, Remova!'
              }).then((result) => {
                if (result.value) {
                    /// add the export fuction to remove ( add in the code once the add cities is done ) 
                    removeCity(this.id);

                  Swal.fire(
                    'Removida!',
                    'A cidade foi removida.',
                    'success'
                  )
                  renderCatalog();                  
                }
              })
              


            
        })
    }

    
}

// adding the add city button if admin == true and its fuctions

if(sessionStorage.getItem("admin")=="true"){
    document.querySelector(".form-group").innerHTML += `<button type="button" id="btnAddCity"class="btn btn-primary m-2">
    Adicionar Cidade
    </button>`
document.querySelector("#btnAddCity").addEventListener("click", function () {
    location.href = "AddCity.html"
})
}




// add the 



// Sorting catalog button fuction ( we have to do a special toggle where we CAN ORganize from A to Z then Z to A)
let sortOrder = "az"; // variable that will decide the order

document.querySelector("#btnSort").addEventListener("click", function () {
//NOTE: we can add a variable where if its I then it will go for AZ, if J then its gonna go for ZA, starts whit az BY default
//we will need also to do some JS css view modification on the button
    const btnSort = document.querySelector("#btnSort");  

    sortCities(sortOrder)
    //after sort fuction, change the sort variable and the button
    if(sortOrder == "az" ){
        btnSort.innerText = "Organizar de Z a A";
        sortOrder = "za";
    }
    else{
        
        btnSort.innerText = "Organizar de A a Z";
        sortOrder = "az";
    }
    
    renderCatalog()
})


// Filter catalog button fuction

document.querySelector("#btnFilter").addEventListener("click", function () {
    const txtCity = document.querySelector("#txtCity").value.toLowerCase()
    const sltZone = document.querySelector("#sltZone").value
    // Chama a função responsável pela exibição do catálogo com os filtros respetivos
    renderCatalog(txtCity, sltZone)
})

