

<template>
<div class="container-fluid">
    <h3 class="display-3">Agenda</h3>

    <div v-if="Loading" class="d-flex justify-content-center">
      <div class="spinner-border m-5 " role="status" style="width: 7rem; height: 7rem;">
          <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-else class="container-fluid row">
      <div v-for="(course) in Courses"
       v-bind:key="course.id">
        <CourseCard v-bind:course="course"></CourseCard>
      </div>
    </div>

</div>
</template>


<script>


import CourseCard from './CourseCard.vue'

export default {
  name: 'app',
  components: {
      CourseCard,

  },
  data: function () {
    return {
      Loading: false,
      Courses: [],
    }
  },
  computed: {
      
  },
  methods: {
    setup: function(){
      //failsafes..

    },
  },
  watch: {
    '$route.name' (to){
          if(to == 'home')
            this.setup();
      },
  },
  mounted(){    
    this.setup();
  },
}

</script>

<style>


</style>
