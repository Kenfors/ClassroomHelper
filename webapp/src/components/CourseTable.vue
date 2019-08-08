

<template>
<div class="container">
    <h3>Kursöversikt</h3>
    <div v-if="!Failed && !Loading" class="container">
        Table
    </div>
    <div v-if="Failed" class="alert alert-danger" >
        Error.
    </div>
</div>
</template>


<script>

import CourseList from './CourseList.vue';

export default {
  name: 'app',
  components: {
      
  },
  data: function () {
    return {
        GClient : this.$root.$GoogleClient,
        Loading: false,
        Failed : false,
        CourseID : -1,


    }
  },
  computed: {
      
  },
  methods: {
      getTableData: function(){

      },

      loadCellData: function(){

      },

  },
  watch: {

  },
  mounted(){    
      this.getCourses();
      
  },
}

</script>

<style>


</style>
