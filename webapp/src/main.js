import Vue from 'vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// eslint-disable-next-line
import * as GoogleAPI from './modules/gapiHandler';

import App from './App.vue'
import LoginScreen from './LoginScreen.vue'

Vue.config.productionTip = false

// eslint-disable-next-line
Vue.prototype.$GoogleClient = gapi;

new Vue({
  
  created : function(){


  },
  methods: {
    
  },
  data: {
    isAuthenticated : false,
    
  },
  mounted : function(){

  },
  computed: {
    ViewComponent() {
      if(this.isAuthenticated) return App;
      else return LoginScreen;
    }
  },
  render (h) { return h(this.ViewComponent) }
}).$mount('#app');
