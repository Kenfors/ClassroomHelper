<template>
  <div id="app" class="container-fluid">
    <!-- TOP-->
    <Header class="bg-dark text-white my-5"></Header>
    <Navbar class="sticky-top"></Navbar>
    <!-- MAIN -->
    <div class="row" id="content">

      <main class="col-10 bg-light text-dark rounded-lg" style="height:900px;">



      </main>
      <aside class="col-2 bg-dark text-white">

          <CourseList></CourseList>

      </aside>

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
      isLoggedin: this.$root.isAuthenticated,//function () { return GoogleAPI.logonStatus();},




    }
  },
  computed: {
    
  },
  methods: {
    
  },
  watch: {

  },
  mounted(){
    
    
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


</style>
