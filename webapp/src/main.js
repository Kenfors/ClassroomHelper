import Vue from 'vue'
import VueRouter from 'vue-router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'
import LoginScreen from './LoginScreen.vue'
import CourseTable from './components/CourseTable.vue'
import Home from './components/Home.vue'

Vue.config.productionTip = false



const routes = [
  {path: '', redirect: '/home'},
  { name: 'home', path: '/home/:courseid', component: Home },
  { name: 'submissions', path: '/submissions/:courseid', component: CourseTable },
  { name: 'feedback', path: '/feedback/:courseid', component: Home },
]

const router = new VueRouter({
  routes: routes, // short for `routes: routes`
  mode: 'history', 
})


// eslint-disable-next-line
Vue.prototype.$GoogleClient = gapi;
Vue.use(VueRouter);

new Vue({
  router,
  created : function(){


  },
  methods: {
    
  },
  data: {
    isAuthenticated : false,
    UserMail: "",
    UserID: "",
    CurrentCourse: null,
    
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
