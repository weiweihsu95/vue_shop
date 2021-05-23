import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery';
import {fb}   from './firebase';
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});

// 根據驗證狀態改變視覺效果
import { configure } from 'vee-validate'

configure({
  classes: {
    valid: 'valid',
    invalid: 'invalid'
  }
})

// 驗證內容語系
import { localize } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'

localize('zh_TW', TW)

import VueFirestore from 'vue-firestore';
require('firebase/firestore')

// 可以使用id代替key值
Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.use(VueFirestore)

// Vue Filter 過濾功能
// 於ProductList.vue使用其中的currency功能，定義商品的價格呈現方式
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

window.$ = window.jQuery = jQuery

import 'popper.js'
import 'bootstrap'
import './assets/app.scss'

// Sweet Alert 提醒功能
import Swal from 'sweetalert2';
window.Swal = Swal;

//Vuex state management
import store from './store.js';


// 可於各檔案加入
Vue.component('Navbar',require('./components/Navbar.vue').default);
Vue.component('Login',require('./components/Login.vue').default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('mini-cart', require('./components/MiniCart.vue').default);
Vue.component('ValidationProvider', ValidationProvider);

// Vue Carousel 輪播功能
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

Vue.config.productionTip = false

//當驗證狀態改變時才會mount資料
// 避免登入後/未登出回首頁需重新登入
let app = '';

fb.auth().onAuthStateChanged(function(user) {

  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");

  }

});
