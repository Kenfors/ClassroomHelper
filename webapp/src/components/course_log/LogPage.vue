

<template>
<div class="container-fluid">
    <h3 class="display-3">Loggbok</h3>

</div>
</template>


<script>

export default {
  name: 'app',
  components: {
      
  },
  data: function () {
    return {
        GClient : this.$root.$GoogleClient,

        Loading: false,
        Failed : false,

        Course: this.$root.CurrentCourse,
        Students : [],
        Works : [],

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


</style>
