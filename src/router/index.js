import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue';
import Dispatcher from '../views/DispatcherView.vue';

//konfiguering av arkitekturen

const routes = [
  {
    path: '/',  //home view
    name: 'Home',
    component: Home
  },
  {
    path: '/dispatcher',
    name: 'Dispatcher',   //dispatcher view
    component: Dispatcher
  }
]

const router = createRouter({ history: createWebHashHistory(), routes })
export default router
