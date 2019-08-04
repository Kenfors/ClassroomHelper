<template>
  <div id="app" class="container-fluid">
    <!-- TOP-->
    <Header></Header>

    <!-- MAIN -->
    <div class="row" id="content">

      <aside class="col-2">

      </aside>

      <main class="col-8" style="height:900px;">
        <CourseList></CourseList>
      </main>

      <aside class="col-2">
        
      </aside>

    </div>

  </div>
</template>

<script>

import Header from './components/Header.vue'
import CourseList from './components/CourseList.vue'

export default {
  name: 'app',
  components: {
    Header,
    CourseList,

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
  background-image: linear-gradient(-33deg, rgb(114, 66, 121), rgb(107, 49, 58), rgb(114, 66, 121), rgb(107, 49, 58));
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.bg-clean {
    background-color: rgba(255, 185, 145, 0.5);
    text-shadow: 0 0 8px white;
}

</style>
