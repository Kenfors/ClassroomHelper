

<template>
<div class="container">
    <h3>Kurser</h3>
    <div v-if="Loading" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div 
        v-for="course in Courses" 
        v-bind:key="course.id" 
        class="row"
        id="courseItem">
        <button class="btn btn-outline-light text-truncate m-2" style="max-width: 60%; height:auto;">{{ course.name }}</button>
        <button class="btn btn-outline-light my-2" style="max-width: 20%; height:auto;" v-on:click="openClassroom(course.alternateLink)">
            <img src="../assets/classIcon.png" alt="" class="rounded img-fluid">
        </button>
    </div>
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
        CurrentCourse: -1,

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
    openClassroom: function(url){
        window.open(url);
    },
    chooseCourse: function(CourseObject){
        this.$emit('courseChoice', CourseObject);
    }
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
