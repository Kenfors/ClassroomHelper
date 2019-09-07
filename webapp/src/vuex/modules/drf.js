

import DHandler from '../../api/drf_handler.js'
// eslint-disable-next-line
import GHandler from '../../api/g_handler.js'

// initial state
const state = {
  agenda: {},
  todo: [],
  saveSuccessfull: false,

//  auth : false,
//  profile : Object,

}

// getters
const getters = {
  getAgenda: (state, id) => {
    console.log("getting text with..." + id);
    return state.agenda[id]},
  getTodolist: (state) => {return state.todo},
      
//    isAuthenticated: (state) => {return state.auth;},
//    profile: (state) => {return state.profile;},
}

// actions
const actions = {

  fetchAgenda: (context, courseID) => {
    DHandler.loadAgenda(context, courseID);
  },
  updateAgenda: (context, Agenda) => {
    context.commit('setAgenda', Agenda)
    DHandler.updateAgenda(context, Agenda);
  },
  fetchTodolist: (context) => {
    DHandler.loadTodolist(context);
  },
  updateTodolist: (context, todolist) => {
    DHandler.updateTodo(context, todolist);
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
  setAgenda: (state, Agenda) => {
    state.agenda[Agenda.courseID] = Agenda.text;
  },
  saveAgendaStatus: (state, didSucceed) => {
    state.saveSuccessfull = didSucceed;
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