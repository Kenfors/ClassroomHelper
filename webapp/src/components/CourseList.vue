

<template>
<div class="container">
    <h3>Kurser</h3>
    <div v-if="Loading" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <button v-for="course in Courses" v-bind:key="course.id" class="btn btn-outline-light btn-block my-2" >
        {{ course.name }}
    </button>
    <div v-if="Failed" class="alert alert-danger" >
        Error.

    </div>
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
        Courses: [],

    }
  },
  computed: {
      
  },
  methods: {
    getCourses: function(){
        var vm = this;
        this.Loading = true;
        this.GClient.client.classroom.courses.list({
            pageSize: 20,
        }).then(function(courseQuery){
            vm.Failed = false;
            // eslint-disable-next-line
            console.log(courseQuery.result);
            vm.Courses = courseQuery.result.courses;
            vm.Loading = false;

        }, function(error){
            vm.Failed = true;
            // eslint-disable-next-line
            console.log("E:" + error);
            vm.Loading = false;
        });
    
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
header {
    background-color: transparent !important;
}

</style>
