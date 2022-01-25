import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from '@/components/Auth/Login.vue'
import store from "../store";
import MainCategoryProducts from '../views/Main/MainCategoryProducts.vue'
import ProductDetails from '../views/Main/ProductDetails.vue';
import Checkout from '../views/Main/Checkout.vue';
import Contact from '../views/Main/Contact.vue';
// import Shop from '../views/Main/Shop.vue';
import Cart from '../views/Main/Cart.vue';
import ManageAddress from '../components/Profile/ManageAddress.vue';
import MyOrder from '../components/Profile/MyOrder.vue';
import Profile from '../views/Main/Profile.vue';
import Wishlist from '../views/Main/Wishlist.vue';
import ChangePassword from '../components/Profile/ChangePassword.vue';
import Payment from '../views/Main/Payment.vue';
const isAuthenticated = (to, from, next) => {
  if (store.getters.fetchAuth.isAuth) {
    next();
    return
  }
  next('/login');
}

const isNotAuthenticated = (to, from, next) => {
  if (!store.getters.fetchAuth.isAuth) {
    next();
    return
  }
  next('/home');
}

Vue.use(VueRouter);

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    beforeEnter: isAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: isNotAuthenticated,
  },
  {
    path:"/profile",
    name:"Profile",
    component:Profile,
    beforeEnter:isAuthenticated,
  },
  {
    path:'/profile/manage-address',
    name:"ManageAddress",
    component:ManageAddress,
  },
  {
    path:'/profile/my-orders',
    name:"MyOrder",
    component:MyOrder,
  },
  {
    path: '/product/search/category/:id',
    name: "MainCategoryProducts",
    component: MainCategoryProducts,
  },
  {
    path: '/product/preview/:id',
    name: "ProductPreview",
    component: ProductDetails,
  },
  // {
  //   path:'/shop',
  //   name:"Shop",
  //   component:Shop
  // },
  {
    path: '/order/checkout',
    name: 'Checkout',
    component: Checkout,
    beforeEnter:isAuthenticated,
  },
  {
    path:"/order/payment",
    name:"Payment",
    component:Payment
  },
  {
    path:'/cart',
    name:"Cart",
    component:Cart
  },
  {
    path: '/contact-us',
    name: 'Contact',
    component: Contact
  },
  {
    path:'/wishlist',
    name:"Wishlist",
    component:Wishlist
  },
  {
    path:'/profile/change-password',
    name:"ChangePassword",
    component:ChangePassword
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
