<template>
<div class="container-fluid bg-dark" id="loginpage">
  <div class="row container-fluid justify-content-center h-75">
      <div class="col-md-auto align-self-center">
        <Logon></Logon>
      </div>

  </div>
  <div>Footer---</div>
</div>
</template>



<script>

import Logon from './components/Logon.vue'

export default {
  name: 'app',
  components: {
      Logon
  },
  data: function () {
    return {
      
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

#loginpage {
    height: 100vh;

}


</style>
