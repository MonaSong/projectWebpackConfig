import Vue from 'vue';
import Router from 'vue-router';
import Info from '../components/Info.vue';
import Index from '../components/Index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Info',
      name: 'Info',
      component: Info
    }
  ]
})
