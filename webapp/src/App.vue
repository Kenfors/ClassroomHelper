<template>
  <div id="app" class="m-0 p-0 bg-NTI">
    <!-- TOP-->
    <Header class="text-white m-0 p-0"></Header>
    <Navbar class="sticky-top m-0 p-0"></Navbar>
    <!-- MAIN -->
    <div class="col-12 row">
        
      <aside class="col-1 bg-NTI text-white pt-5">
      <!--
          <CourseList v-on:courseChoice="selectCourse($event)"></CourseList>
      -->
      </aside>

        <main id="content" class="col-10 bg-light text-dark rounded-lg">
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
    console.log("about to fetch courses...");
    console.log(this['classroom/fetchCourses']);
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
  min-height: 1500px;
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

.bg-bleach {
  background-color: blanchedalmond;
}

.bg-NTI {
  background-color: rgb(85, 34, 105);
}

::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}

::-webkit-scrollbar
{
    width: 10px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
    background-color: #000000;
    border: 2px solid #555555;
}

</style>
