

import GHandler from '../../api/g_handler.js'

// initial state
const state = {
  courses: [],

//  auth : false,
//  profile : Object,

}

// getters
const getters = {
      getCourses: (state) => {return state.courses;},
      
//    isAuthenticated: (state) => {return state.auth;},
//    profile: (state) => {return state.profile;},
}

// actions
const actions = {
      fetchCourses: (context) => {
        console.log("fetching courses...");
        GHandler.getCourses(context);
      },
//    signin: (context) => {
//      GHandler.login(context);
//    },
//    signout: (context) => {
//      GHandler.logout(context);
//    },

}

// mutations
const mutations = {
      updateCourses: (state, courseList) => {
        state.courses = courseList;
      },
//    updateLogin: (state, AuthStatus) => {
//      state.auth = AuthStatus;
//      if(AuthStatus){
//        state.profile = GHandler.profile();
//      }
//      else{
//        state.profile = Object;
//      }
//    },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}