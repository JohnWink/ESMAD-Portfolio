//Import zone
import {
    addSugestion,
    sugestions,
    sugestionCheck,
    sugestionSwitch    
} from "../Controllers/sugestionController.js"

import{userSugestionUp,
    userSugestionDown
} from "../Controllers/usersController.js"



//###########sectionfor the user part of the suggestion page !
//button fuction and sweet alert

const btnSugestion = document.querySelector("#btnSugest")

btnSugestion.addEventListener("click", function(){
    console.log("entered")
    //get the txt area and  logged user,
    const txtSugestion = document.querySelector("#txtSugestion").value;
    const userSugestion = sessionStorage.getItem("loggedUser");
    addSugestion(txtSugestion,userSugestion)
    

})



/// ##############addmin sujection page part
function renderAdmin(){
    //render injection of the admin's sujesction page so he can see all the sujections and getting rid of the users sudgestion's page

      const adminview = document.querySelector("#adminview")
      let result = "";
      
      
  ///injecting the users sugestions
    for(const sugestion of sugestions){          
        result+= `<div class="container-fluid bg-primary rounded-lg">
        <div class="row">
            <div class="col-md-10 text-white font-weight-bold" style="padding-left: 2%; padding-top:1% ; padding-bottom: 1%;" >
            <div class=" row-2" style="padding-top: 0.5%; padding-bottom:0.5% ">Sugestão nº: ${sugestion.dateId}</div>
                <div class=" row-2" style="padding-top: 0.5%; padding-bottom:0.5% ">Utilizador: ${sugestion.username}</div>
                <div class="row-2" style="padding-top: 0.5%; padding-bottom:0.5% ">Data enviada: ${sugestion.date}</div>
                <div class="row-2" style="padding-top: 0.5%; padding-bottom:0.5% ">Sugestão: ${sugestion.sugestion}</div>                
            </div>
            <div class="col-md-2 align-self-center">
            
            <button type="button" class="btn goodSugestion btn-lg text-white font-weight-bold btn-warning" id="${sugestion.dateId}">
                <p>Subir 1 nivel</p>
            </button>
            </div>
        </div>
    </div> <br>`
    
    }

    adminview.innerHTML=result
    

    // fuction to give and remove user xp , give 25xp per good sugestion
    const btnsGood = document.getElementsByClassName("goodSugestion")

    for (const elem of btnsGood) {        
      elem.addEventListener("click", function () {
          let username = "" 
          if(sugestionCheck(this.id) == false){
              // fuction that will switch the goodSugestion value to true return the username whit the sugestions DateID  
            username = sugestionSwitch(this.id)
        
            // add xp to said user 
            userSugestionUp(username)
            

            Swal.fire(
            'Level Up enviado!',
            `o utilizador ${username} subiu 1 nivel!`,
            'success'
            )
              
          }

          else{
            username = sugestionSwitch(this.id)
            userSugestionDown(username)
            


            Swal.fire(
            'Level Up Removido!',
            `o utilizador ${username} desceu 1 nivel!`,
            'success')

          }
          
        
      })
          
         
  
  
}}

  
  




if(sessionStorage.getItem("admin") == "true"){
    // if the user is the admin, then it will render the admin's sujection page
    renderAdmin();

}
