

<template>
<header class="row justify-items-center">
    <div class="col-10 bg-clean ">
        
        <h1 class="display-1">Kursöversikt</h1>

    </div>
    <div class="col-2 justify-self-left bg-clean">

            <Logon class="sticky-top"></Logon>

    </div>
</header>
</template>


<script>

import Logon from './Logon.vue';

export default {
  name: 'app',
  components: {
      Logon,
  },
  data: function () {
    return {
        BannerImage: '',

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
header {
    background-color: transparent !important;
}

</style>
