<template>
  <div id="app" class="m-0 p-0">
    <!-- TOP-->
    <Header class="bg-dark text-white m-0 p-0"></Header>
    <Navbar class="sticky-top m-0 p-0"></Navbar>
    <!-- MAIN -->
    <div class="col-12 row">
        
      <aside class="col-1 text-white pt-5">
      <!--
          <CourseList v-on:courseChoice="selectCourse($event)"></CourseList>
      -->
      </aside>

        <main id="content" class="bg-primary col-10 rounded-lg">
          <transition name="slide-fade" class="container-fluid">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
          </transition>
        </main>

    </div>

  </div>
</template>

<script>

import Header from './components/Header.vue';
import Navbar from './components/Navbar.vue';
//import CourseList from './components/CourseList.vue';

import {mapActions} from 'vuex';

export default {
  name: 'app',
  components: {
    Header,
//    CourseList,
    Navbar,

  },
  data: function () {
    return {
      Loading : false,

    }
  },
  computed: {
    
  },
  methods: {
    ...mapActions({
      loadCourseData: 'classroom/fetchCourses',
      
    }), 
  },
  watch: {

  },
  mounted(){
    this.loadCourseData();
    //this['classroom/fetchCourses'];
    this.$root.$router.push({name: 'home', params:{ courseid: 'none'}},
    function(){
      },
      function(){
        //Failed
      });
  },
}

</script>

<style>

#content {
  margin-top: 1em;
  margin-bottom: 1em;
}
body {

}

main {


}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .0s;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .5s;
}

.fade-leave-active {
  transition: all .0s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.hoverable:hover {
  opacity: 0.7;
  cursor: pointer;
}

::-webkit-scrollbar-track
{
    background-color: #F5F5F5;
}

::-webkit-scrollbar
{
    width: 7px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
    background-color: #00000052;
    
}

.overflow-auto {
  overflow-y: auto;
  overflow-x: scroll;
}

.bg-purple {
  background-color: indigo;

}


</style>
