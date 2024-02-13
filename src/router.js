import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/Home.vue';
import Search from './pages/Search.vue';
import Saved from './pages/Saved.vue';
import Settings from './pages/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/saved',
    name: 'Saved',
    component: Saved
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },{
    path: '/chat/:uuid',
    name: 'Chat',
    component: Home,
   }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
