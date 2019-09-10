

import GHandler from '../../api/g_handler.js'

// initial state
const state = {
  auth : false,
  profile : Object,

}

// getters
const getters = {
    isAuthenticated: (state) => {return state.auth;},
    profile: (state) => {return state.profile;},
}

// actions
const actions = {
    signin: (context) => {
      GHandler.login(context);
    },
    signout: (context) => {
      GHandler.logout(context);
    },

}

// mutations
const mutations = {
    updateLogin: (state, AuthStatus) => {
      state.auth = AuthStatus;
      if(AuthStatus){
        state.profile = GHandler.profile();
      }
      else{
        state.profile = Object;
      }
    },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}