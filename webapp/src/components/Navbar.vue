

<template>
<div class="row p-0 p-0">
  <div class="col-12 p-0">
    <nav class="btn-group my-0 sticky-top">
        <button class="btn btn-dark rounded-0" v-on:click="redirect('home',1)" v-bind:class="{'active' : activeBar==1}">
        <img src="../assets/icon-home.svg" class="d-inline-block align-top" alt="">
        Agenda</button>
        <button class="btn btn-lg btn-dark rounded-0" v-on:click="redirect('submissions',2)" v-bind:class="{'active' : activeBar==2}">
        <img src="../assets/icon-book.svg" class="d-inline-block align-top" alt="">
        Inlämningar</button>
        <button class="btn btn-lg btn-dark rounded-0" v-on:click="redirect('log',3)" v-bind:class="{'active' : activeBar==3}">
        <img src="../assets/icon-star.svg" class="d-inline-block align-top" alt="">
        Loggbok</button>
    </nav>
  </div>
  <div class="col-12 p-0">
    <transition name="fade" mode="out-in">
    <div class="col-10 bg-NTI p-0 text-white" v-if="activeBar != 1">
      <nav class="btn-group sticky-top">
        <button class="btn btn-light rounded-0"
        v-for="(course, index) in Courses"
        v-bind:key="course.id"
        v-on:click="chooseCourse(course.id, index)"
        v-bind:class="{'active' : activeCourseIndex==index}"
        >{{course.name}}</button>
      </nav>
    </div>
    </transition>
  </div>
</div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'app',
  components: {
      
  },
  data: function () {
    return {
      activeBar : 1,
      activeCourseIndex : 1,

    }
  },
  computed: {
      ...mapGetters({
        Courses : 'classroom/getCourses',

      }),

  },
  methods: {
    ...mapActions({
      loadStudents : 'classroom/fetchStudents',
    }),
    chooseCourse: function(courseID, listIndex){
      let vm = this;
      let urlName = this.$route.name;
      if(!urlName.endsWith('+')){
        urlName += '+';
      }
      let cid = this.Courses[listIndex].id;
      this.$root.$router.push({name: urlName, params:{ courseid: cid}},
        function(){
          //Complete
          vm.activeCourseIndex = listIndex;
          vm.loadStudents(cid);
        },
        function(){
          //Failed
        });
    },
    redirect: function(urlPath, activeIndex){
      var vm = this;
      if(this.activeCourseIndex != -1){
        let cid = this.Courses[this.activeCourseIndex].id;
        this.$root.$router.push({name: urlPath +'+', params:{ courseid: cid}},
          function(){
            //Complete
            vm.activeBar = activeIndex;
          },
          function(){
            //Failed
          });
      }
      else{
        this.$root.$router.push({name: urlPath},
          function(){
            //Complete
            vm.activeBar = activeIndex;
          },
          function(){
            //Failed
          });
      }
    },
  },
  watch: {
    
  },
  mounted(){
  },
}

</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;


}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  animation: drop-in .8s reverse;
}

@keyframes drop-in{
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
