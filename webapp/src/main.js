import Vue from 'vue'
import VueRouter from 'vue-router'

// eslint-disable-next-line
import Vuex from 'vuex'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 *  BACKEND STORE
 * 
 */
import store from './vuex/storeindex.js'
import { mapGetters, mapState } from 'vuex'

/**
 *  VIEW COMPONENTS
 * 
 */
import App from './App.vue'
import LoginScreen from './LoginScreen.vue'
//import CourseTable from './components/CourseTable.vue'
//import LogPage from './components/course_log/LogPage.vue'
import Home from './components/home/Home.vue'


Vue.config.productionTip = false


/**
 * ROUTER CONFIG
 * 
 */
const routes = [
  {path: '', redirect: 'home'},
  { name: 'home', path: '/home/:courseid', component: Home },
  //{ name: 'submissions', path: '/submissions/:courseid', component: CourseTable },
  //{ name: 'feedback', path: '/feedback/:courseid', component: LogPage },
]
const router = new VueRouter({
  routes: routes, // short for `routes: routes`
  mode: 'history', 
})


/**
 * ROUTER CONFIG
 * 
 */

Vue.use(VueRouter);



new Vue({
  router,
  store,
  created : function(){

  },
  methods: {

  },
  data: {
  },
  mounted : function(){
  },
  computed: {
    ...mapGetters([
      'auth/isAuthenticated',

    ]),
    ...mapState([

    ]),

    ViewComponent() {
      if(this['auth/isAuthenticated']) return App;
      else return LoginScreen;
    },
  },
  render (h) { return h(this.ViewComponent) }
}).$mount('#app');
