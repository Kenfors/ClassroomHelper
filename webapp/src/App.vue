<template>
  <div id="app" class="container-fluid">
    <!-- TOP-->
    <div class="jumbotron row justify-items-center">
      <div class="col-10">
        <h1>Class Tracker!</h1>

      </div>
      <div class="col-2">
        <Logon class="sticky-top"></Logon>
      </div>
    </div>


    <!-- MAIN -->
    <div class="row" id="content">
      <main style="height:900px;"></main>
    </div>

  </div>
</template>

<script>

import Logon from './components/Logon.vue'

export default {
  name: 'app',
  components: {
    Logon,

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


</style>
