

import DHandler from '../../api/drf_handler.js'
// eslint-disable-next-line
import GHandler from '../../api/g_handler.js'

// initial state
const state = {
  agenda: [],
  todo: [],
  submissionTexts: [],

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
      
  getSubmissionText: (state) => {
    return id => {
      for(let i = 0; i < state.submissionTexts.length; i++){
        if(state.submissionTexts[i].id === id){
          return state.submissionTexts[i].text;
        }
      }
      return null;

    }
  },
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


  fetchSubmissionComment: (context, attrs) => {
    DHandler.loadSubmissionComment(context, attrs);
  },
  updateSubmissionComment: (context, data) => {
    DHandler.updateSubmissionComment(context, data);
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

  saveSubmissionComment: (state, didSucceed) => {
    state.saveSuccessfull = didSucceed;
  },
  
  setSubmissionComment: (state, subText) => {
    for(let i = 0; i < state.submissionTexts.length; i++)
      if(state.submissionTexts[i].id === subText.id) {
        state.submissionTexts[i].text = subText.text;
        return;
      }
    state.submissionTexts.push(subText);
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}