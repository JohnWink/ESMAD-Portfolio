import User from "../Models/usersModel.js";

//Defines an array to save user Objects
export let users=[]

// In case a user key exists in LocalStorage, this one is loaded into the array
//Otherwise, they are saved into the array with several objects User are inserted manualy
if(localStorage.users){
    users = JSON.parse(localStorage.users)
}else{
    const user1= new User("JohnWink", "12345", 0,10,0," ","false")
    const user2= new User("Mint", "54321",0,20,0," ","false")
    const user3= new User("Tiago", "123",0,30,0," ","false")
    const user4= new User("admin", "admin",0,99,0," ","true")
    users.push(user1,user2,user3,user4);
    localStorage.setItem("users", JSON.stringify(users))
}

//Function that checks a user (update of the key on the session storage), returns "true" if credentials exist.
export function login(usernameLogin, passwordLogin){
    let existUser = false
    for(const user of users){
        if(user.username === usernameLogin && user.password == passwordLogin){
            sessionStorage.setItem("loggedUser", usernameLogin)
            sessionStorage.setItem("userXP", user.xp)
            sessionStorage.setItem("userLvl", user.level)
            sessionStorage.setItem("userQuestionId", user.userQuestionId)
            sessionStorage.setItem("userLikes", user.userLikes)
            sessionStorage.setItem("admin", user.admin)
            
            existUser = true
        }
    }
    return existUser
}

//Logout function
export function logout(){
    sessionStorage.removeItem("loggedUser")
}

// Function that registers a user(update of the key in SessionStorage)
export function register(usernameRegister, passwordRegister, xp, level, userQuestionId,userLikes,admin){
    let existUser = false
    for(const user of users){
        if(user.username === usernameRegister && user.password === passwordRegister){
            existUser= true
        }
    }
    if(!existUser){
        users.push(new User(usernameRegister, passwordRegister, xp , level, userQuestionId,userLikes,admin))
        localStorage.setItem("users", JSON.stringify(users))
        sessionStorage.setItem("loggedUser", usernameRegister)
        sessionStorage.setItem("userXP",xp)
        sessionStorage.setItem("userLvl", level)
        sessionStorage.setItem("userQuestionId",userQuestionId)
        sessionStorage.setItem("userLikes", userLikes)
        sessionStorage.setItem("admin", admin)
        return true
    }
    return false
}


// fuction to add and remove userlikes


export function userLikeAdd(cityTxt){

    //it will add the the city they  pressed like in to a string that will be sent to userLikes
    
    let newLikes =  sessionStorage.getItem("userLikes") + ";" + cityTxt;

    sessionStorage.setItem("userLikes", newLikes);
    

    //searching for the index position of the user object 
    for (let i = 0; i < users.length; i++) {
        //find the position of the user
        if (users[i].username === sessionStorage.getItem("loggedUser")) {
            // we knowthe possition of the user [i] so we will modify the users citylikes
            users[i].userLikes = newLikes
            
        }
    }
    sessionStorage.setItem("userLikes", JSON.stringify(newLikes))

    localStorage.setItem("users", JSON.stringify(users))

}

export function userLikeRemove(cityTxt){
    //to remove the like we must get the city like string, then remove the city name, after that we save the changed data
    let baseLikes = sessionStorage.getItem("userLikes");
    let cityRemove = ';' + cityTxt;
    let newLikes = baseLikes.replace(cityRemove,'');

    for (let i = 0; i < users.length; i++) {
        //find the position of the user
        if (users[i].username === sessionStorage.getItem("loggedUser")) {
            // we knowthe possition of the user [i] so we will modify the users citylikes
            users[i].userLikes = newLikes
            
        }
    }

    sessionStorage.setItem("userLikes", JSON.stringify(users.userLikes))

    localStorage.setItem("users", JSON.stringify(users))
    
    
}
export function correctQuestion(){
    
}

export function newPass(pass){
    for(const user of users){
        if(user.username === sessionStorage.getItem("loggedUser")){
            user.password= pass
            localStorage.setItem("users", JSON.stringify(users))
        }
    }
}

export function updateUser(){
      // acrescentar 25 xp ao User quando acerta numa questão e mover para a próxima pergunta
      for (const user of users) {

          
        user.userQuestionId += 1
        sessionStorage.setItem("userQuestionId", user.userQuestionId)
        if(user.username === sessionStorage.getItem("loggedUser")){
          if(user.xp >= 75){

            user.xp = 0
            user.level += 1
            
            

            sessionStorage.setItem("userLvl", user.level)
            sessionStorage.setItem("userXP", user.xp)
       

            Swal.fire({
              type: 'success',
              title: `Nivel ${user.level}`,
              text: 'Parabéns! Passas-te de nível!',
              buttons:{ confirm:"Próxima pergunta"
    
              },
           // It halts page reload until the "ok" button is clicked
            }).then(val =>{
              if(val){
                location.reload()
              }
            })
          }else{
          user.xp += 25
          sessionStorage.setItem("userXP", user.xp)
        
        //Correct popup button
          Swal.fire({
            type: 'success',
            title: 'Certo! :D',
            text: 'Parabéns! Agora para a próxima pergunta!',
            buttons:{ confirm:"Próxima pergunta"
  
            },
         // It halts page reload until the "ok" button is clicked
          }).then(val =>{
            if(val){
              location.reload()
            }
          })
          }
        }

      }
      localStorage.setItem("users", JSON.stringify(users))
}

export function userSorting(){
    users.sort(User.compareUserLevel)
    localStorage.setItem("users", JSON.stringify(users))
}


//################ giving level up to the users for good sugestions

export function userSugestionUp(userName){
  //finding the position of the user on the object array
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === userName) {
    //when found, give a lvl up to the user and stringafy
      users[i].xp = 0
      users[i].level += 1    


      
    }
  }
  localStorage.setItem("users", JSON.stringify(users))
  
}


//#### takes the users sugestuon bonus by taking 1 lvl 

export function userSugestionDown(userName){
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === userName) {
      //if the user's lvl is 1 then nothing happens, if not then take a lvl and stringafy
      
        users[i].xp = 0
        users[i].level -= 1

      
    }
  }
  localStorage.setItem("users", JSON.stringify(users))

}

