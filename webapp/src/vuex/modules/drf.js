

import DHandler from '../../api/drf_handler.js'
// eslint-disable-next-line
import GHandler from '../../api/g_handler.js'

// initial state
const state = {
  agenda: [],
  todo: [],
  saveSuccessfull: false,

//  auth : false,
//  profile : Object,

}

// getters
const getters = {
  getAgenda: (state) => {
    return state.agenda;
  },
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
    for(let i = 0; i < state.agenda.length; i++)
      if(state.agenda[i].courseID === Agenda.courseID) {
        state.agenda[i].text = Agenda.text;
        return;
      }
    state.agenda.push(Agenda);
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