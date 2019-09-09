

<template>
  <div class="col-4 ">
    <div class="container bg-bleach shadow p-3 mb-5 rounded">
      <h5 class="text-center">{{course.name}}</h5>
      <div class=" mx-1 d-flex justify-content-between">
        <button class="btn btn-outline-dark" 
          v-on:click="openClassroom(course.alternateLink)">
          <i class="material-icons large">local_library</i>
          Classroom
        </button>
        <h3 class="display-5">Vecka. {{week}}</h3>


      </div>
    <AgendaText v-bind:courseID="course.id">
    </AgendaText>


    </div>
  </div>
</template>


<script>

import {mapActions} from 'vuex'
import AgendaText from './AgendaText.vue'

export default {
  name: 'card',
  components: {
      AgendaText,

  },
  props: {
    course : Object,

  },
  data: function () {
    return {
        Failed : false,
    }
  },
  computed: {
      week: function(){
        let d = new Date();
        let newYear = new Date(d.getFullYear(), 0);
        let diff = d - newYear;
        diff /= 1000; //Sec
        diff /= 3600; //Hours
        diff /= 24; // days
        diff /= 7; //weeks

        let week = Math.floor(diff +1.1);
        console.log(week);
        return week;

      },
  },
  methods: {
    ...mapActions([
      
    ]), 
    openClassroom: function(url){
      window.open(url);
    },
  },
  mounted(){


  },
}

</script>

<style>


</style>
