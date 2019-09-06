<template>
  <div id="app" class="container-fluid">
    <!-- TOP-->
    <Header class="bg-dark text-white"></Header>
    <Navbar class="sticky-top"></Navbar>
    <!-- MAIN -->
    <div class="row">
        
      <aside class="col-2 bg-dark text-white pt-5 sticky-top">
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
    ...mapActions([
      'classroom/fetchCourses'
    ]),
    
  },
  methods: {
    
  },
  watch: {

  },
  mounted(){
    this['classroom/fetchCourses'];
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
  min-height: 500px;
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

</style>
