import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/styles/main.scss';
import router from './router';

 
 
import VPopover from 'vue-js-popover'
Vue.use(VPopover, { tooltip: true })

 
 import "font-awesome/css/font-awesome.min.css";
 
 Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
 

Vue.use(BootstrapVue);


 
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');