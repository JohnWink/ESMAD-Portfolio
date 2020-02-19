import{logout} from "../Controllers/usersController.js"

updateNavbar()


//funcão cria uma navBar dinâmica que adiciona nome, xp e level do user
export function updateNavbar(){


    if(sessionStorage.getItem("loggedUser")){

  
        document.querySelector("nav").innerHTML=`
        <div class="col-md-2 justify-content-star d-inline-flex " id="userContainer">
          <!--Add/create ID avater icons,make diferent ones for each rank-->
          <!--Temp one atm-->
          <img src="../misc/Images/DG_favicon-02.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">
          `
          if(sessionStorage.getItem("userLvl")< 5){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileNatureApren.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">`
          }else if(sessionStorage.getItem("userLvl")< 10){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileEarthApren.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">`
          }else if(sessionStorage.getItem("userLvl")< 15){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileWaterApren.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">`
          }else if(sessionStorage.getItem("userLvl")< 20){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileFireApren.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">`
          }else if(sessionStorage.getItem("userLvl")< 25){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileNatureSorc.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">`
          }else if(sessionStorage.getItem("userLvl")< 30){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileEarthSorc.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">`
          }else if(sessionStorage.getItem("userLvl")< 35){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileWaterSorc.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">`
          }else if(sessionStorage.getItem("userLvl")< 40){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileFireSorc.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">` 
          }else if(sessionStorage.getItem("userLvl")< 45){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileNatureWiz.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">`
          }else if(sessionStorage.getItem("userLvl")< 50){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileEarthWiz.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">`
          }else if(sessionStorage.getItem("userLvl")< 55){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileWaterWiz.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">`
          }else if(sessionStorage.getItem("userLvl")< 60){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileFireWiz.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">` 
          }else if(sessionStorage.getItem("userLvl")>= 65){
            document.querySelector("#userContainer").innerHTML +=`<img src="../IMG/profileImgs/profileGrandWiz.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">` 
          }
          document.querySelector("#userContainer").innerHTML +=`<a class="navbar-brand text-white col-md-2" href="#welcomeUser">Bem Vindo, ${sessionStorage.getItem("loggedUser")} !</a>`

       
          document.querySelector("nav").innerHTML +=`</div>
      
      <div class="justify-content-end d-inline-flex col-md-6 " >
        <div class="col-md-2 align-self-center text-white  font-weight-bold" >Nivel ${sessionStorage.getItem("userLvl")}</div>

        <div class="col-md-7 align-self-center" >
          <div class="progress" style="height: 25px" > <!--the z-index not working, ask the teacher-->
            
            <div class="progress-bar bg-warning text-dark " role="progressbar" style="width: ${sessionStorage.getItem("userXP")}% ;"
                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${sessionStorage.getItem("userXP")}%</div>  
          </div>
        </div>

        <div class="col-md-3 align-self-center">
          <button type="button" class="btn btn-warning text-white" id="logoutBtn">Log Out</button>
        </div>
      </div>            
        `
  //Butão Logout dá delete à informação do user do momento e manda o user de volta à landingPage
  document.querySelector("#logoutBtn").addEventListener("click", function(){
  logout()
  location.href = "../Index.html";
})
    }
}