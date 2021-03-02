import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //Array de users
    users:[],

    restaurants:[],

    dishes:[],

    feedback:"",

    loggedUser:[],

    reservations:[],

    comments:[],

    historic:[],

    //variável para a função login
    existUser: false,

    //bool pa dar check se alguém está autenticado
    logged: false,
  },

 

  getters: {

    
    restaurantInfo: state => id => {
      return state.restaurants.find(restaurant =>restaurant.id === id);
    },
    

    checkLogged: state => state.logged,

    getLoggedUserId: (state) => {

        return state.loggedUser[0].id
      },  
      
      getLoggedUsername:(state) => {
        return state.loggedUser[0].username
      },

      getLoggedUserAvatar:(state) =>{
        return state.loggedUser[0].avatar
      },
   
    
    getComments: state => state.comments,
    getRestaurants: state =>state.restaurants,

    getRestaurantsById: (state) =>{
      return state.restaurants.sort(function(a,b){
        const idA = a.id
        const idB = b.id
    
        if(idA>idB) return 1;
        if(idB>idA) return -1;

        return 0
      })
    },

    getRestaurantsByRating: (state) =>{
      return state.restaurants.sort(function(a,b){
        const ratingA = a.evaluation
        const ratingB = b.evaluation
    
        if(ratingA>ratingB) return -1;
        if(ratingB>ratingA) return 1;

        return 0
      })
    },

    getRestaurantsByDistance:(state) =>{
      return state.restaurants.sort(function(a,b){
        const distanceA = a.distance
        const distanceB = b.distance
    
        if(distanceA>distanceB) return -1;
        if(distanceB>distanceA) return 1;

        return 0
      })
    },

    getRestaurantByAlphOrder:(state) =>{
      return state.restaurants.sort(function(a,b){
        if(a.name > b.name) return 1;
        if(b.name > a.name) return -1;
      })
    },

    getDishes: state => state.dishes,

    getReservations: state => state.reservations,

    

    getHistoric: state => state.historic,
    
    //get last user Id in array
    getLastUserId: (state)=>{
      if (state.users.length) {
        return 1 + state.users[state.users.length-1].id;
      } else {
        return 0;
      }
    },
    getLastCommentId:(state)=>{
      if(state.comments.length){
        return state.comments[state.comments.length-1].id
      }
    },
    getLastReservationId:(state)=>{
      if (state.reservations.length) {
        return 1 + state.reservations[state.reservations.length-1].id;
      } else {
        return 0;
      }
    },

    getLastDishId:(state)=>{
      if (state.dishes.length) {
        return 1 + state.dishes[state.dishes.length-1].id;
      } else {
        return 0;
      }
    },




    getLastRestaurantId:(state)=>{
      if(state.restaurants.length){
        return 1 + state.restaurants[state.restaurants.length-1].id;
      }else{
        return 0;
      }
    },

   


    getLastHistoricId:(state)=>{
      if(state.historic.length){
        return 1 + state.historic[state.historic.length-1].id;
      }else{
        return 0;
      }
    },
    getLoggedUserLocation:(state)=>{
      return state.loggedUser[0].location
    },

    getRestaurantReservations: (state) =>{
      let reservationList = []
      for (const reservation of state.reservations) {
        if (reservation.restaurantId === state.loggedUser[0].restaurantId) {
          reservationList.push(reservation)        
        }
      }

      return reservationList


    },

    getRestaurantDishes: (state) =>{
      let dishList = []
      for (const dish of state.dishes) {
        if (dish.restaurantId === state.loggedUser[0].restaurantId) {
          dishList.push(dish) 

      }
      
    }return dishList
  },

    getLoggedUserRestaurant: (state) =>{
      return state.loggedUser[0].restaurantId
    },

    getLoggedUserRestaurantType: (state) =>{
      return state.loggedUser[0].restaurantUser
    },

    getLoggedAdmin: (state) =>{
      return state.loggedUser[0].admin
    },

    getCoverLogo: (state) =>{
      let cover = ""
      for (const rest  of state.restaurants) {
        if (rest.restaurantId === state.loggedUser[0].restaurantId) {
          cover = rest.logo
        }
      }
      return cover
    },

    getRestaurantName: (state) =>{
      let name = ""
      for (let rest of state.restaurants) {
        if (rest.id === state.loggedUser[0].restaurantId){
          name = rest.name

        }
      }
      return name
      

    },
    getNotificationRead: (state) =>{

      let read = false
      for (let note of state.historic) {
        if (note.userId === state.loggedUser[0].id){
          if(note.read === false){
            read = true
            break
          }

        }
      }
      return read

    },

    getUserHistoric: (state) =>{
      let userHistorics = []
      for (let note of state.historic) {
        if (note.userId === state.loggedUser[0].id){
          userHistorics.push(note)

        }
      }
      return userHistorics

    },

    feedbackChecker:state=> state.feedback,
    
    

    






   
    userInfo: state => state.users,
  },
  
  mutations: {

   initializeStore(state){

      //+++++++++++++++++++++++++++++++++++++++++++++Initialize Users++++++++++++++++++++++++++++++++++++++++++++++++
    if(localStorage.getItem('users')){
      state.users = JSON.parse(localStorage.getItem("users"));
    }else{
      state.users = [
        {
          id:0,
          username: "admin",
          password:"AllHailAdmins666",
          email: "veryImportantAdmin@yourHouse.lol",
          avatar: "https://i.imgur.com/t2Q8O9v.jpg",
          bio: "Sou admin.",
          admin: true,
          restaurantUser: true,
          restaurantId: 0
        },
        {
          id:1,
          username: "123",
          password:"123",
          email: "123@123.123",
          avatar: "https://i.imgur.com/6txmFi3.png",
          bio: "Sou random.",
          admin: false,
          restaurantUser: false,
          restaurantId: 0
        },
        //Test userRestaurant to test entering the respective restaurant user page
        {
          id:2,
          username: "joaquim",
          password:"chimarrao123",
          email: "chimaraorestaurante@yourHouse.lol",
          avatar: "https://i.imgur.com/t2Q8O9v.jpg",
          bio: "Sou o gestor do restaurante de chimarão ",
          admin: false,
          restaurantUser: true,
          restaurantId: 0
        },
      ]
      localStorage.setItem("users", JSON.stringify(state.users))
    }

    if(localStorage.getItem('comments')){
      state.comments = JSON.parse(localStorage.getItem('comments'));
    }

    if(sessionStorage.getItem("loggedUser")){
      state.loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      state.logged = true;
    }else{
      state.logged = false;
    }
 //+++++++++++++++++++++++++++++++++++++++++++++Initialize Reservations+++++++++++++++++++++++++++++++++++++++++++++
    if(localStorage.getItem('reservations')){
      state.reservations = JSON.parse(localStorage.getItem("reservations"))
    }
    //+++++++++++++++++++++++++++++++++++++++++++++Initialize Historic+++++++++++++++++++++++++++++++++++++++++++++
    if(localStorage.getItem('historic')){
      state.historic = JSON.parse(localStorage.getItem("historic"))
    }

    //+++++++++++++++++++++++++++++++++++++++++++++Initialize Restaurants+++++++++++++++++++++++++++++++++++++++++++++
    if(localStorage.getItem("restaurants")){
      state.restaurants = JSON.parse(localStorage.getItem("restaurants"))
    }else{
      state.restaurants = [
        {
          id:0,
          name:"Chimarrão",
          routerLink:"/restaurant",
          coverImg: "https://i.imgur.com/RhoP4aZ.jpg",
          evaluation: 0,
          description:"Chimarrão é mesmo bão",
          outDoor: true,
          parking: true,
          mediumWaitingTime: 20,
          location:"R. Sara Afonso, 4460-284 Sra. da Hora",

          distance:"",
          travelDuration:"",
          comments: "",
          logo: "https://i.pinimg.com/originals/c1/0a/05/c10a05948ce933f3f92c75f52c489508.png"
        },
        {
          id:1,
          name:"Cascata",
          routerLink:"/restaurant",
          coverImg: "https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/32/2019/10/16141503/Novo-Restaurante-Varanda-de-Lisboa-HOTEL-MUNDIAL-6.jpg",
          evaluation: 0,
          description:"Cascata é mesmo barata",
          outDoor: false,
          parking: false,
          mediumWaitingTime: 20,
          location:"Avenida Fonte Cova, Modivas, 4485-592 Vila do Conde",

          distance:"",
          travelDuration:"",
          comments: "",
          logo: "https://media.istockphoto.com/vectors/restaurant-menu-order-tablet-pc-table-drawing-vector-id469918600"
        },
        {
          id:2,
          name:"Rochedo",
          routerLink:"/restaurant",
          coverImg: "https://imprensafalsa.com/wp-content/uploads/2017/03/scandic-sundsvall-city-restaurant-verket-10.jpg",
          evaluation: 0,
          description:"Rochedo, sabe bem!",
          outDoor: false,
          parking: false,
          mediumWaitingTime: 20,
          location:"R. de Almeiriga Norte 1878, 4455-417 Perafita",

          distance:"",
          travelDuration:"",
          comments: "",
          logo:"https://media.istockphoto.com/vectors/restaurant-menu-order-tablet-pc-table-drawing-vector-id469918600"
        },
        {
          id:3,
          name:"Dona Maria",
          routerLink:"/restaurant",
          coverImg: "https://i.imgur.com/76ph5sb.jpg",
          evaluation: 0,
          description:"Dona Maria, comer lá quem não queria!",
          outDoor: false,
          parking: false,
          mediumWaitingTime: 4,
          location:"Vila do Conde",
          

          distance:"",
          travelDuration:"",
    
          comments:"",
          logo: "https://www.hotelsaintgeorge.com/resources/img/dona-maria.png",
        },
        {
          id:4,
          name:"ESHT",
          routerLink:"/restaurant",
          coverImg: "https://i.imgur.com/l9e8b8M.jpg",
          evaluation: 0,
          description:"Tão bom como o nome sugere",
          outDoor: false,
          parking: false,
          mediumWaitingTime: 4,
          location:"Vila do Conde",
 
          distance:"",
          travelDuration:"",
  
          comments: "",
          logo:"https://media.istockphoto.com/vectors/restaurant-menu-order-tablet-pc-table-drawing-vector-id469918600"
        },
        {
          id:5,
          name:"Su",
          routerLink:"/restaurant",
          coverImg: "https://www.ahstatic.com/photos/5555_rsr001_01_p_1024x768.jpg",
          evaluation: 0,
          description:"Sempre Unidos",
          outDoor: false,
          parking: false,
          mediumWaitingTime: 4,
          location:"Vila do Conde",

          distance:"",
          travelDuration:"",
 
          comments:"",
          logo:"http://surestaurante.com.br/wp-content/uploads/2019/08/su-higienopolis-ouro-wide-01.png",
        },
        {
          id:6,
          name:"Ponto X",
          routerLink:"/restaurant",
          coverImg: "https://restauranteocean.com/wp-content/uploads/2017/06/ocean-diningroom-131.jpg",
          evaluation: 0,
          description:"Encontra a melhor comida aqui.",
          outDoor: false,
          parking: false,
          mediumWaitingTime: 4,
          location:"Rua São Gens 3087, Senhora Da Hora, Porto, 4460-337 Porto",

          distance:"",
          travelDuration:"",
 
          comments:"",
          logo:"http://surestaurante.com.br/wp-content/uploads/2019/08/su-higienopolis-ouro-wide-01.png",
        },
        {
          id:7,
          name:"Magalhães",
          routerLink:"/restaurant",
          coverImg: "https://www.panorama-restaurante.com/pt/resourcefiles/chef-thumb-image/panorama-restaurant.jpg",
          evaluation: 0,
          description:"As melhores francesinhas.",
          outDoor: false,
          parking: false,
          mediumWaitingTime: 4,
          location:"Rua São Gens 3087, Senhora Da Hora, Porto, 4460-337 Porto",

          distance:"",
          travelDuration:"",
 
          comments:"",
          logo:"http://surestaurante.com.br/wp-content/uploads/2019/08/su-higienopolis-ouro-wide-01.png",
        },
        {
          id:8,
          name:"Passione",
          routerLink:"/restaurant",
          coverImg: "https://images.squarespace-cdn.com/content/v1/55426312e4b0cf1b9ec75236/1522089733865-BCCWI79PLA7EAGJ5L7YB/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/K91A8270.jpg?format=2500w",
          evaluation: 0,
          description:"A melhor massa é aqui.",
          outDoor: false,
          parking: false,
          mediumWaitingTime: 4,
          location:"R. Sara Afonso 105-107, 4460-841 Sra. da Hora",

          distance:"",
          travelDuration:"",
 
          comments:"",
          logo:"http://surestaurante.com.br/wp-content/uploads/2019/08/su-higienopolis-ouro-wide-01.png",
        },

      ]

      localStorage.setItem("restaurants", JSON.stringify(state.restaurants))

      
    }
//++++++++++++++++++++++++++++++++++++++++++++++++++Initialize Dishes++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if(localStorage.getItem("dishes")){
      state.dishes = JSON.parse(localStorage.getItem("dishes"))
    }else{
      state.dishes = [{
        id:0,
        name: "Polvo",
        img: "https://i.imgur.com/UGmtMg9.jpg",
        description:
          "Polvo com batata assada gostosa.",
        restaurantId: 0,
        evaluation: 4,
        tag: "Peixe",
        recommended: true
      },
      {
        id:1,
        name: "Salmão",
        img: "https://i.imgur.com/8sBV2Da.jpg",
        description:
          "Salmão é que é bom.",
          restaurantId: 0,
        evaluation: 5,
        tag: "Peixe",
        recommended: false
      },
      {
        id:2,
        name: "Legumes Salteados",
        img: "https://i.imgur.com/ADp7P6o.jpg",
        description:
          "Legumes salteados são fixolas.",
          restaurantId: 2,
        evaluation: 3,
        tag: "Vegetariano",
        recommended: true
      },
      {
        id:3,
        name: "Novilho",
        img: "https://i.imgur.com/mBHmuXK.jpg",
        description:
          "Novilho é noice.",
        restaurantId: 2,
        evaluation: 2,
        tag: "Carne",
        recommended: true
      },
      {
        id:4,
        name: "Cheeseburger",
        img: "https://i.imgur.com/daQj7jD.jpg",
        description:
          "Cheeseburger é okay para quem gosta.",
        restaurantId: 2,
        evaluation: 2,
        tag: "Carne",
        recommended: false
      },
      {
        id:5,
        name: "Bife",
        img: "https://i.imgur.com/QpUTw16.jpg",
        description:
          "Batata a murro é fine, bife é que já na vai.",
        restaurantId: 4,
        evaluation: 2,
        tag: "Carne",
        recommended: true
      },
      {
        id:6,
        name: "Leite Creme",
        img: "https://www.sidul.pt/emshare/views/modules/asset/downloads/originals/2017/01/42308/Leite-Creme.jpg/Leite-Creme.jpg",
        description:
          "O melhor do mundo.",
        restaurantId: 7,
        evaluation: 5,
        tag: "Sobremesa",
        recommended: true
      },
      {
        id:7,
        name: "Natas do Céu",
        img: "https://www.teleculinaria.pt/wp-content/uploads/2017/04/Natas-do-c%C3%A9u-CHSB-16.jpg",
        description:
          "De pedir aos céus.",
        restaurantId: 8,
        evaluation: 4,
        tag: "Sobremesa",
        recommended: true
      },
      {
        id:8,
        name: "Cheesecake Oreo",
        img: "https://i.imgur.com/QpUTw16.jpg",
        description:
          "Comer e chorar por mais.",
        restaurantId: 8,
        evaluation: 2,
        tag: "Sobremesa",
        recommended: true
      }
      ]
      localStorage.setItem("dishes",JSON.stringify(state.dishes))
    }
    
   },

   ADD_RESTAURANT(state,payload){
    state.feedback = ""
     if(!state.restaurants.some(restaurant => restaurant.name === payload.name)){
       if(!state.restaurants.some(restaurant => restaurant.location === payload.location)){
        state.restaurants.push({
          id: payload.id,
          name:payload.name,
          routerLink:"/restaurant",
          coverImg:payload.coverImg,
          evaluation: 0,
          description:payload.description,
          outDoor: payload.outDoor,
          parking: payload.parking,
          mediumWaitingTime: payload.mediumWaitingTime,
          location: payload.location,
          distance:"",
          travelDuration:"",    
          comments:"",
          logo: payload.logo
        });
        localStorage.setItem("restaurants", JSON.stringify(state.restaurants))

        state.feedback="Restaurante válido"

        
      }else{
        state.feedback = "Localização já existe"
      }

    }else{
       state.feedback = "Nome restaurante Já existe"
     }
   },

   ADD_USER_RESTAURANT(state,payload){
    state.feedback = ""
    if(!state.users.some(user => user.email === payload.email)) {
      if(!state.users.some(user =>user.username === payload.username )){
        if(!state.restaurants.some(restaurant => restaurant.name === payload.name)){
          if(!state.restaurants.some(restaurant => restaurant.location === payload.location)){

            state.users.push({
              id: payload.userId,
              avatar: payload.avatar,
              username: payload.username,
              password:payload.password,
              email: payload.email,
              admin: false,
              restaurantUser: payload.restaurantUser,
              restaurantId: payload.userRestaurantId

            });

            state.restaurants.push({
              id: payload.restaurantId,
              name:payload.name,
              routerLink:"/restaurant",
              coverImg:payload.coverImg,
              evaluation: 0,
              description:payload.description,
              outDoor: payload.outDoor,
              parking: payload.parking,
              mediumWaitingTime: payload.mediumWaitingTime,
              location: payload.location,
              distance:"",
              travelDuration:"",    
              comments:"",
              logo: payload.logo
            });
            state.feedback = "Utilizador e restaurante registado"
          }else{
            state.feedback ="Email Já registado"
          }
        }else{
          state.feedback="Nome restaurante Já existe"
        }
      }else{
        state.feedback = "Username já utilizado"
      }
    }else{
      state.feedback = "Localização já existe"
    }
   },

    SET_RESTAURANT_DISTANCE(state,payload){
      state.restaurants[payload.id].distance = payload.distance;
      state.restaurants[payload.id].travelDuration = payload.travelDuration;
      localStorage.setItem("restaurants",JSON.stringify(state.restaurants))
    },
    ADD_USER(state, payload) {
      state.feedback = ""
    //check se email já está registado
    if (!state.users.some(user => user.email === payload.email)) {
      if(!state.users.some(user =>user.username === payload.username )){

        
        //adicionar novo user ao array
          state.users.push({
          id: payload.id,
          avatar: payload.avatar,
          username: payload.username,
          password:payload.password,
          email: payload.email,
          admin: false,
          restaurantUser: payload.restaurantUser,
          restaurantId: payload.restaurantId

        });

        localStorage.setItem("users", JSON.stringify(state.users))
  /*
        //user agora está registado e o login é feito
        state.loggedUser.id = payload.id;
        state.loggedUser.username = payload.username;
        state.loggedUser.profilePic =
          "https://i.ytimg.com/vi/zQ4LiyFF8RU/hqdefault.jpg";

        state.logged = true;
  */
        state.feedback="Utilizador Registado"
        //levar user pra pagina inicial?
      }else{
        state.feedback ="Username já utilizado"
      }
    }else {
        state.feedback ="Email Já registado"
    }


  },
  ADD_COMMENT(state,payload){
    state.comments.push({
      id: payload.id,
      restaurantId: payload.restaurantId,
      name: payload.name,
      img: payload.avatar,
      description: payload.description,
      date: payload.date,
      rating: payload.rating
    })
    localStorage.setItem("comments" ,JSON.stringify(state.comments))
  },
  CALCULATE_RESTAURANT_RATING(state,payload){
    let averageRating = 0
    let counter = 0
    let restaurantId = payload.restaurantId
   
    for(let i = 0; i < state.comments.length; i++){
      if(state.comments[i].restaurantId == restaurantId){
        averageRating += state.comments[i].rating
        counter += 1
      }
    }

    averageRating = averageRating / counter
    state.restaurants[restaurantId].evaluation = Math.round(averageRating)

    localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
  },
  ADD_RESERVATION(state,payload){
    state.reservations.push({
      id: payload.id,
      userId: payload.userId,
      restaurantId: payload.restaurantId,
      name: payload.name,
      peopleNumber: payload.peopleNumber,
      mealTime: payload.mealTime,
      mealDate: payload.mealDate,
      status: payload.status
    })

    localStorage.setItem("reservations", JSON.stringify(state.reservations))
  },
 
  LOGIN(state,payload){

    for (const user of state.users) {
      if (
        user.username === payload.username &&
        user.password === payload.password
      ) {
      state.loggedUser.push({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        location:[],
        admin: user.admin,
        restaurantUser: user.restaurantUser,
        restaurantId: user.restaurantId,
        email: user.email,
        password: user.password
      })
      
        sessionStorage.setItem(
          "loggedUser",
          JSON.stringify(state.loggedUser)
        );
        

        state.existUser = true;
       
      }
    }

    if (state.existUser === false) {
      state.existUser = false;
      state.logged = false;

    } else if(state.existUser===true) {
      state.existUser = false;
      state.logged = true;
    }

  },

  LOGOUT(state) {
    state.loggedUser = [];
    state.logged = false;
    sessionStorage.setItem("loggedUser",JSON.stringify(state.loggedUser))
  },

  //rEsevations changes and removal 
  ACCEPT_RESERVATION(state,payload){
    for (let reservation of state.reservations) {
      if (reservation.id === payload.id){
        reservation.status = payload.status
      }
    }
    localStorage.setItem("reservations", JSON.stringify(state.reservations))
  },

  

  REFUSE_RESERVATION(state,payload){
    let indexRes = 0;
    for (let reservation of state.reservations) {
      
      if (reservation.id === payload.id){
        state.reservations.splice(indexRes,1);
        
      }
      indexRes++;
    }
    localStorage.setItem("reservations", JSON.stringify(state.reservations))

  },

  ADD_HISTORY(state,payload){
    state.historic.push({
      id: payload.id,
      userId: payload.userId,
      restaurantId: payload.restaurantId,
      status: payload.status,
      notification: payload.notification,
      date: payload.date,
      read: false,
      restaurantName: payload.restaurantName
    })
    localStorage.setItem("historic", JSON.stringify(state.historic))
    
  },


  ///-----add and remove dishes commits
  REMOVE_DISH(state,payload){

    let indexDish = 0;
    for (let dish of state.dishes) {
      
      if (dish.id === payload.id){
        state.dishes.splice(indexDish,1);
        
      }
      indexDish++;
    }
    localStorage.setItem("dishes", JSON.stringify(state.dishes))

  },

  ADD_CURRENT_LOCATION(state,payload){
    state.loggedUser[0].location = payload.location
    sessionStorage.setItem("loggedUser",JSON.stringify(state.loggedUser))
  },

  ADD_DISH(state,payload){
    state.dishes.push({
      id: payload.id, 
      name: payload.name,
      img: payload.img,
      description: payload.description,
      restaurantId: payload.restaurantId,      
      evaluation: payload.evaluation,
      tag: payload.tag,
      recommended: payload.recommended
    })

    localStorage.setItem("dishes", JSON.stringify(state.dishes))

  },

  PROFILE_EDIT(state,payload){

    for (let user of state.users) {
      if (user.id === payload.id){
        //change the infor
        user.email = payload.email
        user.password = payload.password
        user.avatar = payload.avatar

        // change the looged stuff
        state.loggedUser[0].email = payload.email
        state.loggedUser[0].password = payload.password
        state.loggedUser[0].avatar = payload.avatar

        sessionStorage.setItem("loggedUser",JSON.stringify(state.loggedUser));
        
      }
    }

    localStorage.setItem("users", JSON.stringify(state.users))
  },
  /*
  ADD_USER_RESTAURANT(state,payload){
      //check se email já está registado
      if (!state.users.some(user => user.email === payload.email)) {
        if(!state.users.some(user =>user.username === payload.username )){
  
        
          //adicionar novo user ao array
            state.users.push({
            id: payload.id,
            avatar: payload.avatar,
            username: payload.username,
            password:payload.password,
            email: payload.email,
            admin: false
          });
  
          localStorage.setItem("users", JSON.stringify(state.users));
  
          //user agora está registado e o login é feito
          state.loggedUser.id = payload.id;
          state.loggedUser.username = payload.username;
          state.loggedUser.profilePic =
            "https://i.ytimg.com/vi/zQ4LiyFF8RU/hqdefault.jpg";
  
          state.logged = true;
          
   
          

          alert("Registado")

  
          //levar user pra pagina inicial?
        }else{
          alert("Username Já Utilizado")
        }
      }else {
        alert("E-MAIL JÁ REGISTADO");
      }

  },
  */

  CHANGE_READ_HISTORIC(state,payload){
    for (let notification of state.historic) {
      if (notification.id === payload.id){
        notification.read = payload.read;
        
      }
    }
    localStorage.setItem("historic", JSON.stringify(state.historic))

  },

  EDIT_RESTAURANT(state,payload){

    for (let restaurant of state.restaurants) {
      if (restaurant.id === payload.id){
        //change the infor
        restaurant.name = payload.name
        restaurant.coverImg = payload.coverImg
        restaurant.description = payload.description
        restaurant.outDoor = payload.outDoor
        restaurant.parking =payload.parking
        restaurant.mediumWaitingTime= payload.mediumWaitingTime
        restaurant.location = payload.location
        restaurant.logo = payload.logo
        
      }
    }

    localStorage.setItem("restaurants", JSON.stringify(state.restaurants))

  },

  //remove restaurantes do array
  /*REMOVE_RESTAURANT(state,payload){

    let indexRestaurant = 0;
    for (let restaurant of state.restaurants) {
      
      if (restaurant.id === payload.id){
        state.restaurants.splice(indexRestaurant,1);
        
      }
      indexRestaurant++;
    }
    localStorage.setItem("restaurants", JSON.stringify(state.restaurants))

  },*/


  




  
 
},
  actions: {},
  modules: {}
});
