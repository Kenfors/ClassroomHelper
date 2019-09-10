

import GHandler from '../../api/g_handler.js'

// initial state
const state = {
  courses: [],
  courseWorks: [],
  submissions: [],
  students: [],


//  auth : false,
//  profile : Object,

}

// getters
const getters = {
      getCourses: (state) => {return state.courses;},
      getCourseWorks: (state) => {return state.courseWorks},
      getSubmissions: (state) => {return state.submissions},
      getStudents: (state) => {return state.students},

//    isAuthenticated: (state) => {return state.auth;},
//    profile: (state) => {return state.profile;},
}

// actions
const actions = {
      fetchCourses: (context) => {
        GHandler.getCourses(context);
      },
      fetchSubmissions: (context, courseID) => {
        GHandler.getSubmissions(context, courseID);
      },
      fetchStudents: (context, courseID) => {
        GHandler.getStudents(context, courseID);
      },
}

// mutations
const mutations = {
      updateCourses: (state, courseList) => {
        state.courses = courseList;
      },
      updateCourseWork: (state, courseWorkList) => {
        state.courseWorks = courseWorkList;
      },
      updateSubmissions: (state, payload) => {

        // Append only in the right place by index, due to mixed order from async calls.
        if (state.submissions.length < payload.size){
          state.submissions = new Array(payload.size);
        }
        state.submissions.splice(payload.index, 1, payload.subs);

        //state.courseWorks[payload.index]['submissions'] = payload.subs;
      },
      updateStudents: (state, studentList) => {
        state.students = studentList;
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