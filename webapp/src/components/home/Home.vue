<template>
<div class="container-fluid">
    <h3 class="display-3">Agenda</h3>

    <transition name="fade">
    <div v-if="Loading" class="d-flex justify-content-center">
      <div class="spinner-border m-5 " role="status" style="width: 7rem; height: 7rem;">
          <span class="sr-only">Loading...</span>
      </div>
    </div>
    

    <div v-else class="container-fluid row my-5">
        <CourseCard 
        v-for="(course) in Courses"
        v-bind:key="course.id"
        v-bind:course="course">
        </CourseCard>      
    </div>
    </transition>

</div>
</template>


<script>

import {mapGetters} from 'vuex'
import CourseCard from './CourseCard.vue'

export default {
  name: 'app',
  components: {
      CourseCard,

  },
  data: function () {
    return {
      Loading: false,
      
    }
  },
  computed: {
      ...mapGetters({
        Courses : 'classroom/getCourses',

      }),
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
