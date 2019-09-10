

<template>
<div class="container">
    <h3>Kurser</h3>
    <div v-if="Loading" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div 
        v-for="(course, index) in Courses" 
        v-bind:key="course.id" 
        class="row"
        id="courseItem">
        <button 
            class="btn btn-outline-light text-truncate m-2" 
            style="max-width: 60%; height:auto;"
            v-bind:class="{'active' : CurrentCourse==index}"
            v-on:click="chooseCourse(index)"
        >{{ course.name }}</button>
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
        var GClient = this.$root.$GoogleClient;
        this.Loading = true;
        GClient.client.classroom.courses.list({
            pageSize: 20,
            courseStates: 'ACTIVE',

        }).then(function(courseQuery){
            vm.Failed = false;
            vm.Courses = courseQuery.result.courses;
            vm.Loading = false;

            let cid = vm.$route.params.courseid;
            for(let i = 0; i < vm.Courses.length;i++){
                if(vm.Courses[i].id == cid){
                    vm.chooseCourse(i);
                }
            }

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
    chooseCourse: function(courseIndex){
        this.$store.dispatch('setCourse', this.Courses[courseIndex]);
        let cid = this.Courses[courseIndex].id
        this.$root.$router.push({name: this.$route.params.name, params: { courseid: cid }});
        this.CurrentCourse = courseIndex;
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
