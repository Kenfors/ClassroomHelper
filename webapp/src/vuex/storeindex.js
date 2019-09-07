import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.js'
import classroom from './modules/classroom.js'
import drf from './modules/drf.js'


Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        auth,
        classroom,
        drf,
        
    },
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
  
  })