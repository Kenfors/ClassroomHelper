

<template>
<div class="container-fluid">


</div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {
      
  },
  data: function () {
    return {
      ActiveStudent: Number,

    }
  },
  computed: {
    ...mapGetters({
      Students : 'classroom/getStudents',

    }),
  },
  methods: {
    chooseStudent: function(index) {
      this.ActiveStudent = index;
    },

  },
  watch: {

  },
  mounted(){    
    
  },
}

</script>

<style>


</style>
