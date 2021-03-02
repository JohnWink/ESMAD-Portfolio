import Vue from "vue";
import VueRouter from "vue-router";





Vue.use(VueRouter);

const routes = [
  {
    path:"/landingPage",
    name:"landingPage",
    component:()=>
    import("../views/LandingPage.vue")
  },
  
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
 
  
  {
    path:"/restaurant/:id",
    name: "restaurant",
    component:() =>
      import("../views/RestaurantPage.vue")
  },
  {
    path:"/",
    name:"guestPage",
    component:() => 
    import("../views/GuestPage.vue")
  },
  {
    path:"/restaurantList",
    name:"restaurantList",
    component:() => 
      import("../views/RestaurantList.vue")
  },
  {
    path:"/restaurantManager",
    name:"restaurantManager",
    component:()=>
      import("../views/RestaurantManager.vue")
  },

  {
    path:"/userRestaurantPage",
    name:"userRestaurantPage",
    component:()=>
      import("../views/UserRestaurantPage.vue")
  },
  {
    path:"/DishesPage",
    name:"DishesPage",
    component:()=>
      import("../views/DishesPage.vue")
  },
  {
    path:"/notificationPage",
    name:"notificationPage",
    component:()=>
      import("../views/NotificationPage.vue")
  },

 
];

const router = new VueRouter({  
  routes
});

export default router;
