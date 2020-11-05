import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PaymentResponse from "../views/PaymentResponse.vue";
import NotFound from "../views/404.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/payment-response',
    name: 'PaymentResponse',
    component: PaymentResponse
  },
  {
    path: '*', 
    component: NotFound
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
