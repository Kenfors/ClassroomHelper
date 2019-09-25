

<template>
<div class="">
  <h3 class="display-4">Inlämningar & Rättning</h3>
  <p class="text-justify "> Här kan du se status för uppgifter i classroom. Klicka på en cell i tabellen för att skriva/läsa kommentarer.</p>
  <h3 class="font-weight-light">
    <span>Färgbetydelse: </span>
    <span class="ml-1 badge badge-success font-weight-light">Inlämnad</span>
    <span class="ml-1 badge badge-warning font-weight-light">Skickat tillbaka</span>
    <span class="ml-1 badge badge-danger font-weight-light">Ej inlämnat</span>
    <span class="ml-1 badge badge-success bg-purple font-weight-light">Aldrig öppnad</span>
  </h3>
  <div class="row p-0" v-if="CourseWork.length > 0">
    <div class="col-2 p-3 mx-0">
      <p class="text-right text-truncate"><b>Namn</b></p>
      <div class="container-fluid d-flex my-1 p-0"
      style="min-height: 40px; max-height: 40px;"
      v-for="student in Students" v-bind:key="student.id">
        <div class="container-fluid p-0 m-0">
          <p class="p-0 text-truncate text-right align-middle">{{student.profile.name.fullName}}</p>
        </div>
      </div>
    </div>
      <div class="col-10 d-flex flex-nowrap overflow-auto align-items-start p-3 bg-primary">
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
    routeChange: function() {
      let route = "" + this.$route.name + this.$route.params['courseid'];
      return route;
    }
  },
  methods: {
    ...mapActions([
      'classroom/fetchSubmissions'
    ]),
    load: function() {
      if(this.currentCourse)
        this['classroom/fetchSubmissions'](this.currentCourse);
    },

  },
  watch: {
    currentCourse(to, from){
        this.load();
      }
  },
  mounted(){    
    this.load();
  },
}

</script>

<style>


</style>
