import{logout, newPass} from "../Controllers/usersController.js"



document.querySelector("#nivel").innerHTML=`Nivel: ${sessionStorage.getItem("userLvl")}`


//XP progress bar
document.querySelector("#progressBar").style.width=sessionStorage.getItem("userXP") + "%"
document.querySelector("#progressBar").innerHTML=sessionStorage.getItem("userXP") + "%"



// Avatar pic and tittle, depending on the users lvl, each 5 lvl is a new tittle and avatar
if(sessionStorage.getItem("userLvl")< 5){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileNatureApren.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Aprendiz ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")< 10){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileEarthApren.png" class="rounded-lg border-secondary" id="perfilIcon"">`
  document.querySelector("#perfilName").innerHTML=` Aprendiz ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")< 15){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileWaterApren.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Aprendiz ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")< 20){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileFireApren.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Aprendiz ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")< 25){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileNatureSorc.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Sacerdote ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")< 30){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileEarthSorc.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Sacerdote ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")< 35){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileWaterSorc.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Sacerdote ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")< 40){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileFireSorc.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Sacerdote ${sessionStorage.getItem("loggedUser")}` 
}else if(sessionStorage.getItem("userLvl")< 45){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileNatureWiz.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Mestre ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")< 50){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileEarthWiz.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Mestre ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")< 55){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileWaterWiz.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Mestre ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")< 60){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileFireWiz.png" class="rounded-lg border-secondary" id="perfilIcon">` 
  document.querySelector("#perfilName").innerHTML=` Mestre ${sessionStorage.getItem("loggedUser")}`
}else if(sessionStorage.getItem("userLvl")>= 65){
  document.querySelector("#perfilContainer").innerHTML +=`<img src="../IMG/profileImgs/profileGrandWiz.png" class="rounded-lg border-secondary" id="perfilIcon">`
  document.querySelector("#perfilName").innerHTML=` Grande Mestre ${sessionStorage.getItem("loggedUser")}` 
}

updateNavbar()
//##### Navbar update fuction
function updateNavbar(){
    if(sessionStorage.getItem("loggedUser")){

  
        document.querySelector("nav").innerHTML=`
        <div class="col-md-2 justify-content-star d-inline-flex ">
          <!--Add/create ID avater icons,make diferent ones for each rank-->
          <!--Temp one atm-->
          <img src="../misc/Images/DG_favicon-02.png" class="rounded-lg border-secondary" style="width: 22%; height: 22%;">
          <a class="navbar-brand text-white col-md-2" href="#welcomeUser">Bem Vindo, ${sessionStorage.getItem("loggedUser")} !</a>
        </div>
        <div class="col-md-3 align-self-center">
          <button type="button" class="btn btn-warning text-white" id="logoutBtn">Log Out</button>
        </div>
                 
        `
    }
}
if(sessionStorage.getItem("admin") === "true"){
  document.querySelector("#sideColumn").innerHTML=`<button type="button" class="btn btn-danger" id="manageQuestionBtn">Manage Questions</button>`
  document.querySelector("#manageQuestionBtn").addEventListener("click", function(){
    location.href="../HTML/manageQuestionBackOffice.html"
  })
}

//######## Changing the users password
document.querySelector("#frmNewPass").addEventListener("submit",function(event){

      //Checks if the inputted passwords match
      if(document.querySelector("#changePassword").value== document.querySelector("#changePasswordConfirm").value){
       if(document.querySelector("#changePasswordConfirm").value !== ""){
        const pass = document.querySelector("#changePasswordConfirm").value
        //adds new password to user
        newPass(pass)
        Swal.fire({
          type: 'success',
          text: 'As passwords foram mudadas com sucesso!',
        })
      }else{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Por favor preencha os campos vazios',
          footer: 'Tente novamente!'
        })
      }
      }else{

        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'As passwords não são iguais',
          footer: 'Tente novamente!'
        })

      }
  event.preventDefault()
})

//Logout button deletes current user info and sends the user back into the landing page
document.querySelector("#logoutBtn").addEventListener("click", function(){
    logout()
    location.href = "../Index.html";
  })

