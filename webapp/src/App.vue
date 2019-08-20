<template>
  <div id="app" class="container-fluid">
    <!-- TOP-->
    <Header class="bg-dark text-white my-5"></Header>
    <Navbar class="sticky-top"></Navbar>
    <!-- MAIN -->
    <div class="row" id="content">

      <aside class="col-2 bg-dark text-white pt-5 sticky-top">
          <CourseList v-on:courseChoice="selectCourse($event)"></CourseList>
      </aside>

        <main class="col-10 bg-light text-dark rounded-lg">
          <transition name="fade" class="container-fluid">
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
import CourseList from './components/CourseList.vue';

export default {
  name: 'app',
  components: {
    Header,
    CourseList,
    Navbar,

  },
  data: function () {
    return {
      isLoggedin: this.$root.isAuthenticated,

    }
  },
  computed: {
    
  },
  methods: {
    selectCourse: function(newSelection){
      this.$root.CurrentCourse = newSelection;
    },
    
  },
  watch: {

  },
  mounted(){
    var vm = this;
    this.$on('courseChoice', function(newCourse){
      vm.CurrentCourse = newCourse;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-out;
  opacity: 0;
  margin: 0;
  padding: 0;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
