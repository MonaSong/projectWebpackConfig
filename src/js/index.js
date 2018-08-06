import Vue from 'vue';
import App from './containers/App.vue';
import router from './router';
import '../assets/style/index.css';
import ElementUI from 'element-ui';
import store from './store/index';

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.ft = (v) => {
  //..
  console.log('全局方法')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})