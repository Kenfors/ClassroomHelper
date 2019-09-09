

import GHandler from '../../api/g_handler.js'

// initial state
const state = {
  courses: [],
  courseWorks: [],
  

//  auth : false,
//  profile : Object,

}

// getters
const getters = {
      getCourses: (state) => {return state.courses;},
      getCourseWorks: (state) => {return state.courseWorks},
      getSubmissions: (state) => (workID) => {
        let work = state.courseWorks.find(function(elem){
          return elem.id = workID;
        });
        if (work){
          if(work.submissions)
            return work.submissions;
        }
        return [];
      },
//    isAuthenticated: (state) => {return state.auth;},
//    profile: (state) => {return state.profile;},
}

// actions
const actions = {
      fetchCourses: (context) => {
        GHandler.getCourses(context);
      },
      fetchSubmissions: (context, courseID) => {
        console.log("Fetching coursework..");
        GHandler.getSubmissions(context, courseID);
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
      updateSubmissions: (state, index, submissionList) => {
        
        console.log(submissionList);
        
        state.courseWorks[index]['submissions'] = submissionList;
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