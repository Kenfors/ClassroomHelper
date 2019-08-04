<template>
  <div id="app" class="container-fluid">
    <div class="jumbotron row justify-items-center">
      <div class="col-10">
        <h1>Class Helper!</h1>

      </div>
      <div class="col-2">
        <Logon></Logon>
      </div>
    </div>
    <div class="row" id="content">

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
