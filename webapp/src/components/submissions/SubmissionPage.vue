

<template>
<div class="">
  <h3 class="display-3">Inlämningar</h3>
  <div class="row" v-if="CourseWork.length > 0">
    <div class="col-2 p-3 mx-0">
      <p class="text-right"><b>Namn</b></p>
      <div class="container-fluid d-flex my-1 p-0"
      style="min-height: 40px; max-height: 40px;"
      v-for="student in Students" v-bind:key="student.id">
        <div class="container-fluid p-0 m-0">
          <p class="p-0 mt-1 text-right align-middle">{{student.profile.name.fullName}}</p>
        </div>
      </div>
    </div>
      <div class="col-10 d-flex flex-nowrap overflow-auto align-items-start p-3">
        <course-work-col
        v-for="(work, index) in CourseWork" v-bind:key="work.id"
        v-bind:courseTitle="work.title"
        v-bind:index="index">
          </course-work-col>
    </div>
  </div>

</div>
</template>


<script>

import {mapActions, mapGetters} from 'vuex'
import CourseWorkCol from './CourseWorkCol.vue'


export default {
  name: 'app',
  components: {
      CourseWorkCol,

  },
  data: function () {
    return {
        Loading: false,
        Failed : false,

    }
  },
  computed: {
    ...mapGetters({
      CourseWork : 'classroom/getCourseWorks',
      Students : 'classroom/getStudents',

    }),
 

    currentCourse: function() {
      return this.$route.params['courseid'];
    },
  },
  methods: {
    ...mapActions([
      'classroom/fetchSubmissions'
    ]),

  },
  watch: {
    currentCourse(to, from){
      if(to != undefined && to != from){
        this['classroom/fetchSubmissions'](this.currentCourse);
      }
    }
  },
  mounted(){    
    
  },
}

</script>

<style>


</style>
